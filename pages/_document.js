import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyCustomDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags } // return styles collected
  }

  render () {
    return (
      <html>
      <Head>
        <title>Looking Glass Sample</title>
        {this.props.styleTags}
        <script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-analytics.js"></script>

      </Head>
      <body>
      <Main />
      <NextScript />
      </body>
      </html>
    )
  }
}
