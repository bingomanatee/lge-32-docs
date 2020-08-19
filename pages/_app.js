import '../styles/globals.scss'
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&display=swap" rel="stylesheet" />
    </Head>
    <Component {...pageProps} />
    </>
}

export default MyApp
