import Head          from 'next/head'
import styles        from './layout.module.scss'
import utilStyles    from '../styles/utils.module.css'
import Link          from 'next/link'
import Header        from '../components/Header';
import { useRouter } from "next/router";
const name = 'Your Name'
export const siteTitle = 'Next.js Sample Website'

console.log('--- styles: ', styles)
export default function Layout({ children, home }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
    <div className={styles.container}>
      <div className={styles['container-head']} />
      <div className={styles['container-accent']} />
      <Header onClick={() => router.push('/')}>
        <img src="/img/logo.svg" />
      </Header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            Back to home
          </Link>
        </div>
      )}
    </div>
    </>
  )
}
