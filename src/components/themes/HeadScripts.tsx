'use client'
import { useEffect } from 'react'
import React from 'react'
import Script from 'next/script'
import Mmenu from 'mmenu-js'

const HeadScripts = () => {
  useEffect(() => {
    const menuElement = document.querySelector('#menu') as HTMLElement
    if (menuElement) {
      new Mmenu(menuElement)
    }

    const $ = window.jQuery
    if ($) {
      // Các plugin sử dụng jQuery có thể gọi ở đây
      console.log('jQuery is ready')
    }
  }, [])

  return (
    <>
      <Script src="/assets/js/bootstrap.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/jquery.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/mmenu.js" strategy="afterInteractive" />
      {/*<Script*/}
      {/*  src="/assets/js/swiper-bundle.min.js"*/}
      {/*  strategy="afterInteractive"*/}
      {/*/>*/}
      {/*<Script src="/assets/js/swiper.js" strategy="afterInteractive" />*/}
      <Script src="/assets/js/lazysize.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/rangle-slider.js" strategy="afterInteractive" />
      <Script src="/assets/js/nouislider.min.js" strategy="afterInteractive" />
      <Script
        src="/assets/js/jquery.nice-select.min.js"
        strategy="afterInteractive"
      />
      <Script src="/assets/js/countto.js" strategy="afterInteractive" />
      <Script
        src="/assets/js/magnific-popup.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/js/jquery.nice-select.min.js"
        strategy="afterInteractive"
      />
      <Script src="/assets/js/rangle-slider.js" strategy="afterInteractive" />
      <Script src="/assets/js/wow.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/main.js" strategy="afterInteractive" />
    </>
  )
}

export default HeadScripts
