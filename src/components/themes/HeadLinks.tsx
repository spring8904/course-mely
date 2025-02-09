import React from 'react'
import Head from 'next/head'
import Script from 'next/script'

const HeadLinks = () => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/logo/favicon.png" />
        <link
          rel="apple-touch-icon-precomposed"
          href="/images/logo/favicon.png"
        />
      </Head>
      <Script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        strategy="afterInteractive"
        integrity="sha384-KyZXEAg3QhqLMpG8r+Knujsl5+5hb7V6Wo3E2s8Zr1An1pF7XKp5yzl5tD6U4sOY"
        crossOrigin="anonymous"
      />
    </>
  )
}

export default HeadLinks
