'use client'

import { useState } from 'react'
import Script from 'next/script'

const HeadScripts = () => {
  const [jQueryLoaded, setJQueryLoaded] = useState(false)
  return (
    <>
      <Script src="/assets/js/bootstrap.min.js" />
      <Script
        src="/assets/js/jquery.min.js"
        onLoad={() => {
          setJQueryLoaded(true)
        }}
      />
      {/* <Script src="/assets/js/mmenu.js" /> */}
      {/* <Script src="/assets/js/swiper-bundle.min.js" /> */}
      {/* <Script src="/assets/js/swiper.js" /> */}
      <Script src="/assets/js/lazysize.min.js" />
      <Script src="/assets/js/nouislider.min.js" />
      <Script src="/assets/js/wow.min.js" />

      {jQueryLoaded && (
        <>
          <Script src="/assets/js/jquery.nice-select.min.js" />
          <Script src="/assets/js/rangle-slider.js" />
          <Script src="/assets/js/countto.js" />
          <Script src="/assets/js/magnific-popup.min.js" />
          <Script src="/assets/js/main.js" />
        </>
      )}
    </>
  )
}

export default HeadScripts
