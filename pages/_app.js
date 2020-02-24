import React from 'react'
import App from 'next/app'
import { Provider as StandardAPIProvider } from 'react-standardapi'
import client from '../components/client'
import { ThemeProvider } from 'pcln-design-system'
import { theme } from 'cinderblock'
import { appWithTranslation } from '../components/i18n'
import AppBar from '../components/AppBar'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <StandardAPIProvider client={client}>
          <>
            <AppBar />
            <Component {...pageProps} />
          </>
        </StandardAPIProvider>
      </ThemeProvider>
    )
  }
}

export default appWithTranslation(MyApp)
