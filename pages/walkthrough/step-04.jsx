import Layout                   from "../../components/Layout";
import Head                     from "next/head";
import Property                 from "../../components/Property";
import NextButton               from "../../components/NextButton";
import Code                     from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import CodeDisplay              from "../../components/CodeDisplay";
import userStore from './codeSamples/step-04/userStore.txt';
import App from './codeSamples/step-04/App.txt';
import AppView from './codeSamples/step-04/AppView.txt';

export default () => (
  <Layout>
    <Head>
      <title>LGE walkthrough: page 4</title>
    </Head>
    <article>
      <h1>Walkthrough</h1>

      <h2>Hooking into a real Firebase auth system</h2>

      <p>Now that we have basic flow of information locally working lets have some fun
        and hook up a real backend: Firebase Authentication.</p>

      <iframe src="https://codesandbox.io/embed/looking-glass-engine-login-demo-part-2-with-firebase-t84t4?fontsize=14&hidenavigation=1&theme=dark"
        style={{width: '100%', height: '500px', border: 0, borderRadius: '4px', overflow: 'hidden'}}
        title="looking glass engine - login demo part 2 - with firebase"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>

      <p>The streams we are going to create
        are variations of our test login system that submit their values to Firebase. We'll add a userStore to manage
      the user login/data seperately because that state we will want to persist longer and potentially
      access in other contexts:</p>

      <CodeDisplay>
        {App}
      </CodeDisplay>

      <p>The view will recieve any login errors and the user as well:</p>

      <CodeDisplay>
        {AppView}
      </CodeDisplay>

      <h2>The <code>userStore</code></h2>

      <div className="diagram">
        <img src="/img/userStore.svg"/>
      </div>

      <p>The userStore communicates with firebases' auth layer and stores any user data returned from it, or error
      codes on a failed signup/signin.</p>
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

      <h2>A Piece of the Action</h2>
      <p><img src={'/img/action.png'}  style={{width: 655/2, height: 624/2}} className="framedImage framedImage__right"/>
        The actions, register and signIn, are in fact essentially identical, but they call a different firebase
        endpoint.
        They are asynchronous, and you don't have to freak. Unlike Redux actions, looking glass actions are completely
        free to interact with the store at their own tempo. They can call set or other actions of the store to update
        values, and can do so even across an async jump.
      </p>

      <CodeDisplay>{userStore}
      </CodeDisplay>

      <p>Now we add actions that pass the field values into the user lSelf to login or subscribe through the userStore.
      Because the store is a provided resource, like any other code library, the stores can talk to each other
      and monitor their values</p>

      <NextButton href={'/walkthrough/step-05'} prevHref={'/walkthrough/step-03'}>
        Now that we're in lets have some fun
      </NextButton>
    </article>
  </Layout>)
