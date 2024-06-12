// import Router from 'next/router'
import { LoaderProvider, useLoader } from '@/hooks/use-loader'
import { ViolinLoader } from '@/hooks/use-loader/components'
import { useState, useEffect } from 'react'
import React from 'react'
import { AuthProvider } from '@/hooks/use-auth'
import DefaultLayout from '@/component/default-layout'
import '@/styles/globals.scss'
import '@/styles/loader.scss'

import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  const getLayout =
    Component.getLayout ||
    ((page) => (
      <LoaderProvider CustomLoader={ViolinLoader}>
        <DefaultLayout>
          <ManageRouteChange>
            <div className="container">{page}</div>
          </ManageRouteChange>
        </DefaultLayout>
      </LoaderProvider>
    ))
  return (
    <>
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
    </>
  )
}

function ManageRouteChange({ children }) {
  const router = useRouter()
  const { setLoading } = useLoader()

  useEffect(() => {
    const routeStart = () => {
      console.log('start')
      setLoading(true)
    }
    const routeComplete = () => {
      console.log('complete')
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
    router.events.on('routeChangeStart', routeStart)
    router.events.on('routeChangeComplete', routeComplete)
    router.events.on('routeChangeError', routeComplete)

    return () => {
      router.events.off('routeChangeStart', routeStart)
      router.events.off('routeChangeComplete', routeComplete)
      router.events.off('routeChangeError', routeComplete)
    }
  }, [])

  return children
}
