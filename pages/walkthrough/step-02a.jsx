import Layout                   from "../../components/Layout";
import Head                     from "next/head";
import Property                 from "../../components/Property";
import NextButton               from "../../components/NextButton";
import Code                     from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import CodeDisplay              from "../../components/CodeDisplay";
import AddPanelCode from './codeSamples/step-02a/AddPanelCode.txt';
import makeStore from './codeSamples/step-02a/makeStore.txt';
import panels from './codeSamples/step-02a/Panels.txt';
import Panel from './codeSamples/step-02a/Panel.txt';
import EditPanel from './codeSamples/step-02a/EditPanel.txt';
export default () => (
  <Layout>
    <Head>
      <title>LGE walkthrough: page 2-a</title>
    </Head>
    <article>
      <h1>Walkthrough</h1>
      <h2>Step two/a: A panel editor -- with actions</h2>

      <p>Now, we can pull in the update methods to the store definition itself:</p>

      <p>using <code>addActions</code> we'll bind a set of actions to the store; the fields will get automatic setters, and the
        editng functionality we will bind with our own custom accessors.</p>

      <iframe src="https://codesandbox.io/embed/looking-glass-engine-panels-with-actions-8983p?codemirror=1&fontsize=14&hidenavigation=1&theme=dark"
        style={{width: '100%', height: '500px', border: 0, borderRadius: '4px', overflow: 'hidden'}}
        title="looking glass engine - login demo part 2 - with actions"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>

      <p>Now, we can pull in the update methods to the store definition itself:</p>
      <CodeDisplay>{makeStore}
      </CodeDisplay>
<p>addActions is a decorator that applies itself to instantiated stores. it adds a <code>do</code> method that contains all
the defined actions (the second property) plus automatic <code>set[field]</code>
  methods for all the initial keys in the store. These actions are passed the store itself as the first argument,
and any additional arguments are passed through. They don't require binding, so you can use them in event hooks. </p>
      <h2>Adding a Panel</h2>
      <p>The panel addition code is now accessed off the <code>do</code> property of the store.
        <code>addingPanel</code> is now in the store so an automatic "set" method is available for it:</p>
      <CodeDisplay>
        {AddPanelCode}
      </CodeDisplay>
      <h2>Editing a Panel</h2>
      <p>The Editing code now refers to pre-defined methods of the store itself</p>

      <CodeDisplay>
        {EditPanel}
      </CodeDisplay>

      <p>So you can see, instead of verbose action setters for each data update we simply set
        the values we want into the central store; however, there is another shortcut available,
        in-built actions for custom execution, that can further clean up this cycle.</p>

      <NextButton href={'/walkthrough/step-03'}>
        Let's log in
      </NextButton>
    </article>
  </Layout>)
