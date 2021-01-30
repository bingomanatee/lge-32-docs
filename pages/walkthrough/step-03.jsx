import Layout      from "../../components/Layout";
import Head        from "next/head";
import Property    from "../../components/Property";
import NextButton  from "../../components/NextButton";
import CodeDisplay from "../../components/CodeDisplay";
import fieldStore from './codeSamples/step-03/fieldStore.txt';
import makeStore from './codeSamples/step-03/makeStore.txt';
import makeStore2 from './codeSamples/step-03/makeStore_2.txt';

export default () => (
  <Layout>
    <Head>
      <title>LGE Walkthrough: page 1</title>
    </Head>
    <article>
      <h1>Walkthrough</h1>
      <h2>A fully controlled login form</h2>
      <p>First, we'll create a login page that takes a user name and a password.
        These fields must be set to a specific format to be valid:</p>

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

      <iframe src="https://codesandbox.io/embed/runtime-butterfly-eoplv?fontsize=14&hidenavigation=1&theme=dark"
        style={{width: '100%', height: '500px', border: 0, borderRadius: '4px', overflow: 'hidden'}}
        title="User Login part 1"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>

      <p>The actual state management is done in "makeStore.js". This structure is unusual so let's break it down.</p>

      <ol>
        <li>The root state is a ValueStoreMap with two fields: username and password. It has a "mock submitter".
          <CodeDisplay>{makeStore}</CodeDisplay>
        </li>
        <li>
          Each field is a similar structure -- so we will <i>compose</i> other
          ValueMapStreams with sub-values for each field:
          <CodeDisplay>{makeStore2}
          </CodeDisplay>
          This copies the value of sub-ValueStreams into the fields of the root stream. Because of this, we can
          define the sub-stream to meet reusable criteria -- in this case, the behavior of the "touched" field
          and emitting errors when the value doesn't meet passed-in criteria.
          This stream watches any updates and synchronizes the error and touched fields
        </li>
        <li>the changing of uncontrolled entry fields is transported to the <code>loginStore</code> through onChange
          hooks
        </li>
        <li>The subscription to the root store gets both fields values and errors, in sub-maps.</li>
        <li><code>errors</code> and <code>canSubmit</code> are extracted to react state to trigger re-rendering on the
          changing of those properties
        </li>
      </ol>

      <h3><code>fieldStore.js</code></h3>
      <p>fieldStore creates a sub-store that has predictable behaviors when fields are updated.</p>
      <CodeDisplay>{fieldStore}</CodeDisplay>

      <p>This allows us to quickly sketch out a deep control system that is responsive to value changes with a
      relatively small amout of business code</p>
      <div className="diagram">
        <img src="/img/loginDiagram.svg"/>
      </div>

      <NextButton href={'/walkthrough/step-04'} prevHref={'/walkthrough/step-02a'}>
        step 4
      </NextButton>
    </article>
  </Layout>)
