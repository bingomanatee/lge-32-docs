import Layout                   from "../../components/Layout";
import Head                     from "next/head";
import Property                 from "../../components/Property";
import NextButton               from "../../components/NextButton";
import Code                     from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import CodeDisplay              from "../../components/CodeDisplay";

export default () => (
  <Layout>
    <Head>
      <title>LGE walkthrough: page 2</title>
    </Head>
    <article>
      <h1>Walkthrough: step two: hooking into a real Firebase auth system.</h1>

      <p>Now that we have basic flow of information locally working lets have some fun
        and hook up a real backend lSelf: Firebase Authentication.</p>

      <p>The Firebase stuff is well documented by Google. The useful part for us is that we are creating a lSelf
        that is NOT tied into react directly to interface with it and lSelf login state. This is one of
        the nice features of Looking Glass -- you can have local stores that manage a web view,
        or you can have static stores that are not tied to UI but that UI can listen to when it needs to.</p>

      <h2>The <code>userStore</code></h2>

      <div className="diagram">
        <img src="/img/userStore.svg"/>
      </div>

      <iframe src="https://codesandbox.io/embed/looking-glass-engine-login-demo-part-2-with-firebase-t84t4?fontsize=14&hidenavigation=1&theme=dark"
        style={{width: '100%', height: '500px', border: 0, borderRadius: '4px', overflow: 'hidden'}}
        title="looking glass engine - login demo part 2 - with firebase"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>

      <p>The userStore is actually simpler than the form; it has three fields:</p>
      <Property>
        <h3>
          <code>user</code>
        </h3>
        <div>
          <ul>
            <li>can be absent</li>
            <li>Is an object, if set</li>
            <li>Returned by Firebase so out of our control</li>
          </ul>
        </div>
        <h3><code>status</code></h3>
        <div>
          <ul>
            <li>A string</li>
            <li>starts as "not logged in"</li>
            <li>Can be "not logged in", "logging in" or "not logged in"</li>
          </ul>
        </div>
      </Property>

      <p>We aren't enforcing any schema on this structure at this point.</p>

      <h2>A Piece of the Action</h2>
      <p><img src={'/img/action.png'}  style={{width: 655/2, height: 624/2}} className="framedImage framedImage__right"/>
        The actions, register and signIn, are in fact essentially identical, but they call a different firebase
        endpoint.
        They are asynchronous, and you don't have to freak. Unlike Redux actions, looking glass actions are completely
        free to interact with the lSelf at their own tempo. They can call set or other actions of the lSelf to update
        values, and can do so even across an async jump.
      </p>

      <div style={{backgroundColor: 'black'}}>
        <Code highlight={code => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: '1rem',
            color: 'white'
          }} value={`
actions: {
  async logIn(lSelf, username, password) {
    lSelf.do.setLoginError("");
    lSelf.do.setStatus(LOGGING_IN);
    try {
      let { user } = await firebase.doSignInWithEmailAndPassword(
        username,
        password
      );
      lSelf.do.setUser(user);
      lSelf.do.setStatus(LOGGED_IN);
    } catch (error) {
      lSelf.do.setLoginError(error.message);
      lSelf.do.setStatus(NOT_LOGGED_IN);
    }
  },
 //....
 }
          `}>
        </Code>
      </div>

      <p>Now we add actions that pass the field values into the user lSelf to login or subscribe through the userStore.</p>


<CodeDisplay>{`
 const lStream = new ValueStoreMap(
    {
      username: { fieldValue: "", error: "" }, // these are placeholders;
      password: { fieldValue: "", error: "" }, // will be replaced by fieldStores
      canSubmit: false,
      submitState: "entering",
      loginError: "",
      user: false,
      storeSub: null
    },
    {
      actions: {
        submit(lSelf) {
          userStore.do.logIn(
            lSelf.my.username.fieldValue,
            lSelf.my.password.fieldValue
          );
          lSelf.do.watchUser();
        },
        register(lSelf) {
          userStore.do.register(
            lSelf.my.username.fieldValue,
            lSelf.my.password.fieldValue
          );
          lSelf.do.watchUser();
        },
        signOut(lSelf) {
          userStore.do.signOut();
          lSelf.do.setUser(false);
          lSelf.do.reset();
        },
        clearSub(lSelf) {
          if (lSelf.my.userSub) {
            lSelf.my.userSub.unsubscribe();
            lSelf.do.setUserSub(null);
          }
          lSelf.do.resetState();
        },
        resetState(lSelf) {
          lSelf.do.setSubmitState("entering");
          lSelf.do.setUser(false);
          lSelf.do.setCanSubmit(false);
          lSelf.do.setLoginError("");
        },
        reset(lSelf) {
          lSelf.do.clearSub();
          lSelf.streams.get("password").do.reset();
          lSelf.streams.get("username").do.reset();
          lSelf.do.resetState();
        }
      }
    }
  );
`}</CodeDisplay>
      <p>And we keep the field definition from the previous example:</p>
<CodeDisplay>{`
  lStream.addStream(
    "username",
    fieldStore((fieldValue, stream) => {
      if (fieldValue.length < 1) {
        stream.do.setError("username muse be present");
      } else if (!/.+@.+\\..+/.test(fieldValue)) {
        stream.do.setError("username must be a proper e-mail address");
      } else {
        stream.do.setError("");
      }
    })
  );

  lStream.addStream(
    "password",
    fieldStore((fieldValue, stream) => {
      if (fieldValue.length < 1) {
        stream.do.setError("password muse be present");
      } else if (fieldValue.length < 10) {
        stream.do.setError("password muse be 10 or more characters");
      } else if (/\\s/.test(fieldValue)) {
        stream.do.setError("password cannot have spaces");
      } else {
        stream.do.setError("");
      }
    })
  );
          `}
        </CodeDisplay>
      <p>Also, we have the loginStore listen to the userStore and update select properties.
        Separate watching reduces unnecessary updates. </p>

<CodeDisplay>{`
  const userWatch = userStore.watch("user").subscribe((map) => {
    lStream.do.setUser(map.get("user"));
  });

  const errorWatch = userStore.watch("loginError").subscribe((map) => {
    const loginError = map.get("loginError");
    if (lStream.my.loginError !== loginError) {
      if (loginError) {
        lStream.do.resetState();
      }
      lStream.do.setLoginError(loginError);
    }
  });

  lStream.subscribe(
    () => {},
    () => {},
    () => {
      errorWatch.unsubscribe();
      statusWatch.unsubscribe();
      userWatch.unsubscribe();
    }
  );
          `}</CodeDisplay>

      <p>note because the userStore has a long lifespan and the loginStore might not, we turn off the listening relationship
      when the loginStore is completed.</p>

      <NextButton href={'/walkthrough/step-03'} prevHref={'/walkthrough/step-01'}>
        Now that we're in lets have some fun
      </NextButton>
    </article>
  </Layout>)
