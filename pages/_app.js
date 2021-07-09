import '../styles/globals.scss'
import Head from 'next/head';

function MyApp({Component, pageProps}) {
  return <>
    <Head>
      <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&display=swap" rel="stylesheet"/>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet"/>
      <link rel="preload" href="/KapraNeue/KaraNeue.css" type="text/css" rel="stylesheet"/>
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
