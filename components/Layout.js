import Head          from 'next/head'
import styles        from './layout.module.scss'
import utilStyles    from '../styles/utils.module.css'
import Link          from 'next/link'
import Header        from '../components/Header';
import { useRouter } from "next/router";
const name = 'Your Name'
export const siteTitle = 'Next.js Sample Website'

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
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
    <div className={styles.container}>
      <div>&nbsp;</div>
      <Header onClick={() => router.push('/')}>
        <div className="spacer">&nbsp;</div>
        <div className="logo">
          <img src="/img/logo.png" />
        </div>
        <div className="title">
          <h1>Looking Glass Engine 3.3</h1>
        </div>
      </Header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
    </>
  )
}
