// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.jsx
import React from 'react'
import getConfig from 'next/config'
import Document, { Html, Main, NextScript, Head } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class NextDoc extends Document {
  static async getInitialProps (ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
      })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render () {
    const {
      gaAccountId,
      googleTagManagerId,
    } = getConfig().publicRuntimeConfig

    const enableGA = Boolean(gaAccountId)
    const enableGoogleTagManager = Boolean(googleTagManagerId)

    // https://github.com/isaachinman/next-i18next/issues/20#issuecomment-443461652
    const { initialLanguage } = this.props.__NEXT_DATA__.props

    return (
      <Html lang={initialLanguage}>
        <Head>
          {enableGA && (
            <script dangerouslySetInnerHTML={{
              __html: `
                window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
                ga('create', '${gaAccountId}', 'auto');
                ga('send', 'pageview');
              `
            }}
            />
          )}
          {enableGA && <script async src="https://www.google-analytics.com/analytics.js" />}
          {enableGoogleTagManager && (
            <script dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${googleTagManagerId}');
              `
            }}
            />
          )}
          <link href="https://fonts.googleapis.com/css?family=Montserrat:300,500,700&display=fallback" rel="stylesheet" />
        </Head>
        <Main />
        <div id="tooltip-portal" />
        <NextScript />
      </Html>
    )
  }
}

export default NextDoc
