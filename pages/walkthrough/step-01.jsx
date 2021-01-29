import Layout      from "../../components/Layout";
import Head        from "next/head";
import Property    from "../../components/Property";
import NextButton  from "../../components/NextButton";
import CodeDisplay from "../../components/CodeDisplay";

export default () => (
  <Layout>
    <Head>
      <title>LGE Walkthrough: page 1</title>
    </Head>
    <article>
      <h1>Walkthrough: </h1>
      <h2>first step, login form</h2>
      <p>We're sing Firebase auth to log in; so lets create a client site store that helps manage the
        state around both activities. First, we'll create a sign-up page that takes a user name and a password.</p>
      <p>These fields require a particular format:</p>

      <Property>
        <h3>
          Email
        </h3>
        <div>
          <ul>
            <li>Must be present</li>
            <li>Must be in email format: __@__.__</li>
          </ul>
        </div>
        <h3>Password</h3>
        <div>
          <ul>
            <li>Must be present</li>
            <li>must be 5+ characters</li>
            <li>cannot contain spaces</li>
          </ul>
        </div>
      </Property>

      <p>However -- the store has to accept whatever value the user enters, and note errors as they occur - ONCE the
        user changes the field. </p>

      <p>Looking Glass Engine provides a mechanic for creating extended fields that themselves have logic and
        fields.</p>

      <iframe src="https://codesandbox.io/embed/runtime-butterfly-eoplv?fontsize=14&hidenavigation=1&theme=dark"
        style={{width: '100%', height: '500px', border: 0, borderRadius: '4px', overflow: 'hidden'}}
        title="User Login part 1"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>

      <p>The actual state management is done in "makeStore.js". This structure is unusual so let's break it down.</p>

      <ol>
        <li>The root state is a ValueStoreMap with two fields: username and password. It has a "mock submitter".
          <CodeDisplay>{`
  const lStream = addActions(
    new ValueMapStream({
      username: { fieldValue: "", touched: false, error: "" }, // these are placeholders;
      password: { fieldValue: "", touched: false, error: "" }, // will be replaced by fieldStores
      submitState: "entering"
    }),
    {
      submit(store) {
        store.do.setSubmitState("submitting");
        setTimeout(() => {
          store.do.setSubmitState("recieved");
        }, 1500);
      },
       canSubmit(store) {
        return [
          store.fieldSubjects.get("username"),
          store.fieldSubjects.get("password")
        ].reduce((can, stream) => {
          return can && stream.do.isValid();
        }, true);
      }
    }
  );`}</CodeDisplay>
        </li>
        <li>
          Each field is a similar structure -- so we will <i>compose</i> other
          ValueMapStreams with sub-values for each field:
          <CodeDisplay>{`
  lStream.addFieldSubject(
    "username",
    fieldStore((fieldValue, stream) => {
      if (fieldValue.length < 1) {
        return "username muse be present";
      } else if (!/.+@.+\\..+/.test(fieldValue)) {
        return "username must be a proper e-mail address";
      } else {
        return "";
      }
    }, "username")
  );

  lStream.addFieldSubject(
    "password",
    fieldStore((fieldValue, stream) => {
      if (fieldValue.length < 1) {
        return "password muse be present";
      } else if (fieldValue.length < 10) {
        return "password muse be 10 or more characters";
      } else if (/\\s/.test(fieldValue)) {
        return "password cannot have spaces";
      } else {
        return "";
      }
    }, "password")
  );

  return lStream;
          `}
          </CodeDisplay>
          This stream watches any updates and synchronizes the error and touched fields
        </li>
        <li>the changing of uncontrolled entry fields is transported to the <code>loginStore</code> through onChange
          hooks
        </li>
        <li>The subscription to the root store gets a map of both fields</li>
        <li><code>errors</code> and <code>canSubmit</code> are extracted to react state to trigger re-rendering on the
          changing of those properties
        </li>
      </ol>

      <h3><code>fieldStore.js</code></h3>
<CodeDisplay>{`
export default (errorTest, fieldKey) => {
  // the stream is a manager for an individual form field.
  const stream = addActions(
    new ValueMapStream({ fieldValue: "", error: "", touched: false }),
    {
      isValid(store) {
          return store.my.touched && (!store.my.error);
      },
      reset(store) {
        store.next(new Map([
          ['fieldValue', ''],
          ['error', ''],
          ['touched', false],
        ]))
      }
    }
  );
`}</CodeDisplay>
      <p>We will make an event watcher on each fieldStream that updates error
        and touched whenever the store's value is updated.</p>
      <CodeDisplay>
        {`
  stream.watch("fieldValue").subscribe((map) => {
    if (!stream.my.touched && !map.get("fieldValue")) {
      return;
    }

    const error = errorTest(map.get("fieldValue"), stream);
    stream.do.setError(error);
    stream.do.setTouched(true);
  });

  // this ensures that the field starts with no errors displayed,
  // even if its value (blank at start) would ordinarily be an error.
  stream.do.reset();
  return stream;
};`}
      </CodeDisplay>
      <div className="diagram">
        <img src="/img/loginDiagram.svg"/>
      </div>

      <h2>What are we gaining through using Looking Glass Engine?</h2>
      <ul>
        <li><b>Built-in setters.</b> All the set[field] functions are produced automatically and accessed off the
          <code>.do</code>&nbsp;sub-property, so we don't have to pump out boilerplate updaters.
        </li>
        <li><b>Complex sub-structures can be produced functionally.</b>
        the sub-structure has a consistent profile,
          and the part we do want to customize, error checking, we pass in as a function.
        </li>
        <li><b>Easy observation of a subset of fields.</b> With <code>.watch(fieldA, fieldB...)</code>
          in the context of the fieldStore's output stream, we produce a
          <a href="https://www.learnrxjs.io/learn-rxjs/concepts/rxjs-primer" target="observables">observable object</a>
          that we can listen for changes on. in this case we:
          <ol>
            <li><b>Listen to changes in the value</b> to update the errors of the per-field store</li>
            <li><b>listen to all the errors the per-field stores produce,</b> in the loginStore -- the root store --
             to ensure we don't submit bad values, </li>
            <li><b>watch the <code>submitState</code></b> in the loginStore to prevent re-submitting after sending once. </li>
          </ol>
        </li>
      </ul>
      <NextButton href={'/walkthrough/step-02'}>
        Now let's get real and hook this up to a real auth system
      </NextButton>
    </article>
  </Layout>)
