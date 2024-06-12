import React from 'react'
import Head from 'next/head'
import Header from './default-layout/header'
import Footer from './default-layout/footer'

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
