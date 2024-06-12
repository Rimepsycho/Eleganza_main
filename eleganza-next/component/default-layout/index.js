import React from 'react'
import Head from 'next/head'
import Header from './header'
import Footer from './footer'

export default function DefaultLayout({ children }) {
  return (
    <>
      <Head>
        <title>Eleganza Studio</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}
