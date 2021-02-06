import Layout                   from "../../components/Layout";
import Head                     from "next/head";
import Property                 from "../../components/Property";
import NextButton               from "../../components/NextButton";
import Code                     from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import CodeDisplay              from "../../components/CodeDisplay";
import AddPanelCode from './codeSamples/step-02/AddPanelCode.txt';
import makeStore from './codeSamples/step-02/makeStore.txt';
import panels from './codeSamples/step-02/Panels.txt';
import Panel from './codeSamples/step-02/Panel.txt';
import EditPanel from './codeSamples/step-02/EditPanel.txt';
export default () => (
  <Layout>
    <Head>
      <title>LGE walkthrough: page 1</title>
    </Head>
    <article>
      <h1>Walkthrough</h1>
      <h2>A panel editor</h2>

      <p>Next we're going to create a few sample panels and an editing suite.</p>

      <p>this will use a <code>ValueMapStore</code>. ValueMapStores use maps to store the data - and allow us to set them on a field by field basis.</p>

      <h2>The <code>ValueMapStream</code></h2>

      <p>A ValueMapStream is a multi-value stream; it has an internal map whose members can be stored and updated by name.</p>
      <iframe src="https://codesandbox.io/embed/looking-glass-engine-panel-set-h83sy?fontsize=14&hidenavigation=1&theme=dark"
        style={{width: '100%', height: '500px', border: 0, borderRadius: '4px', overflow: 'hidden'}}
        title="looking glass engine - login demo part 2 - panels"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>

      <p>The store itself we will create in a modular function. Even though the underlying store is a map, we will submit the data as an object for simplicity</p>

<CodeDisplay>
  {makeStore}
</CodeDisplay>

      <p>The Panels page will save the store itself as a state property. We will subscribe and dump its values into another state, to keep
        the app updating when the store updates -- but this "dump" is simply to force React to sync:.</p>

      <CodeDisplay>
        {panels}
      </CodeDisplay>
      <p>The keys in the store can be accessed using dot notation --- <code>{`          {panelStore.my.panels.map((panel, index) => (`}</code>.
      Alternately you can call <code>{`panelStore.value.get('panels')`}</code> to retrieve a value in the store.
      </p>

      <h2>Adding a Panel</h2>
      <p>Clicking "Add Panel" opens up an add item form. We pass the store directly into this container, and when the submit is complete,
        the new panel is pushed into the store's panels. The field management and temporary values are all
        managed by Grommet's Form API; we could (and later will) do that with stores, but for now,
        we'll use Grommet's automated form management tags as they come.</p>

      <CodeDisplay>
        {AddPanelCode}
      </CodeDisplay>

      <h2>Viewing the panel</h2>
      <p>The individual panels are passed their index and the store. In this way they can
        extract their own data for display. </p>
      <p>They can also pass the store/index to a component displayed when their index is
      the index for the edited panel</p>

      <CodeDisplay>
        {Panel}
      </CodeDisplay>

      <h2>Editing a Panel</h2>
      <p>If the editingIndex is that of the current panel the editing form is displayed. We are again using
      Grommet's form utilities to mange the edited update. Upon completion, we reset the editingIndex
      to -1 to point to no current panel. In this case, the initial panel data is cloned (by useState)
      and no observation of state past that point is needed; the update is fed through to the store
      when the editing is complete; or alternately the editing index is reset if the user cancels.</p>

      <CodeDisplay>
        {EditPanel}
      </CodeDisplay>

      <p>This code lacks any ornament for reducers or actions; the proerties are set or updated on the fly
        by the <code>store.set(key, value)</code> method. However there is another tool we can use to further
      compress the code into a more managed system: store actions</p>

      <NextButton href={'/walkthrough/step-02a'} prevHref={'/walkThrough/step-02'}>
        Let's add actions
      </NextButton>
    </article>
  </Layout>)
