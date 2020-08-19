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
      <p>The original Looking Glass documentation started with the APIs; however the only way to really appreciate the API is to see how
      easy it makes developing complex rigorous web apps. So lets start with a working example, using it for a Deep,
      Firebase-backed e-com shopping site. </p>
       <NextButton href={'/walkthrough/step-01'} />
    </article>
    </Layout>
  )
}
