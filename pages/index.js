import Head                  from 'next/head'
import styles                from '../styles/Home.module.css'
import Link                  from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles            from '../styles/utils.module.css'
import NextButton            from "../components/NextButton";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>Looking Glass Engine 3.3</title>
      </Head>
     <article>
      <h1>Looking Glass Engine: State Backbones for Web Development</h1>
       <p>Looking Glass Engine is borne of a frustration with the current status quo of React data stores -
       Redux, Thunk, Saga et al.</p>
       <h2>The Problematic status quo</h2>
       <p>All of these systems share a set of features which make control systems difficult to write:</p>
       <ul>
         <li>It is difficult to understand the system as a whole</li>
         <li>Changes are difficult to chain because they are generally not synchronous </li>
         <li>Observing sub-sets of states is burdensome</li>
         <li>The action format is overly ritualistic</li>
         <li>There is no mechanic to throttle large update batches</li>
         <li>Testing Redux-controlled components is difficult or impossible </li>
       </ul>
       <h2>Redux is part of the solution</h2>
       <p>Redux has many solutions to these problems but it is so open-ended and profuse that it is difficult to
       know what steps you need to do do generate useful stores. Also, adding <i>methods</i> to a stream
       are not really part of the paradigm. </p>
       <h3>The Looking Glass Paradigm</h3>
       <ul>
         <li>Looking glass is <b>wholly synchronous. </b> you can set a property of a looking glass store and immediately
           see that value resolved; even if you do so inside of a method</li>
         <li>Looking glass engine is <b>wholly testable.</b> As an object model the stores can be tested using standard
           OOP test mechanics. As a localized item, one can always simply accept a test-provided store as a parameter
           to execute expected patterns inside a tested component or use context to inject one into deeper components.
         </li>
         <li>
           LGE store fields can be <b>filtered and sanitized.</b> You can either outright reject bad values,
           or you can interrupt updates and force any input to conform to desired specifications.
         </li>
         <li>
           LGE gives you all the power of Redux: throttling, distinct values, debounces and any other
           data control mechanics (including post-fixing immutability or syncronizing indexDB or local storage with watchers)
           can be utilized with a LGE store.
         </li>
         <li>
           LGE stores are <b>composable</b>. You can design sub-stores and feed them into higher level collections
           through <code>fieldSubjects</code>.
         </li>
       </ul>

       <h2>See how it runs</h2>
      <p>The only way to really appreciate the API is to see how
      easy it makes developing complex rigorous web apps. So lets start with a working example, using it for a Deep,
      Firebase-backed e-com shopping site. </p>
       <NextButton href={'/walkthrough/step-01'}>
         Let's start with an example
       </NextButton>
    </article>
    </Layout>
  )
}
