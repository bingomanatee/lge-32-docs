import Head                  from 'next/head'
import styles                from './../styles/Home.module.css'
import Link                  from 'next/link'
import Layout, { siteTitle } from '../components/Layout'
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
         <li>Store systems tend to span multiple files making overall comprehension tiresome</li>
         <li>Changing values are in general delayed making prodedures difficult to write or comprehend</li>
         <li>Transporting state to React modues is elaborate</li>
         <li>The action format an incredibly ritualized interperatation of basic functional methodology</li>
         <li>Filtering input values, managing thrown errors, and observing change on Redux stores is involved
         and difficult</li>
         <li>There is no mechanic to throttle large update batches; every action automatically triggers a
         broadcast update.</li>
         <li>Unit Testing Redux-controlled components is difficult or impossible </li>
       </ul>
       <h2>RXJS is part of the solution</h2>
       <p>RXJS has many solutions to these problems but it is so open-ended and profuse that it is difficult to
       know what steps you need to do do generate useful stores. Also, adding <i>methods</i> to a stream
       are not really part of the paradigm. </p>
       <h2>The Looking Glass Paradigm</h2>
       <ul>
         <li>Looking glass is <b>wholly synchronous.</b> you can set a property of a looking glass store and immediately
           find that value has been set in the store; even if you do so inside of a method. (it may of course take some time
         to percolate into the DOM because of Redux's draw cycle, but anyone with access to the store can find its
         current, accurate values.</li>
         <li>Looking glass engine is <b>wholly testable.</b> As an object model the stores can be tested using standard
           OOP test mechanics. the store is generally passed wholesale as a property, so you can always construct a
           mocked version of that store when testing client components.
         </li>
         <li>
           LGE store fields can be <b>filtered and sanitized.</b> You can either outright reject bad values,
           or you can interrupt updates and force any input to conform to desired specifications (round numbers,
           filter out unwanted characters in strings, enforce range bounds, etc.)
         </li>
         <li>
           LGE gives you all the power of RXJS: throttling, distinct values, debounces and any other
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

       <ol>
         <li><a href={"/walkthrough/step-01"}>A simple chart</a></li>
         <li><a href={"/walkthrough/step-02"}>A panel editor</a></li>
         <li><a href={"/walkthrough/step-02a"}>Adding actions to the panel editor</a></li>
         <li><a href={"/walkthrough/step-03"}>A login form</a></li>
       </ol>
     <hr />
       <NextButton href={'/walkthrough/step-01'}>
         The First Example
       </NextButton>
    </article>
    </Layout>
  )
}
