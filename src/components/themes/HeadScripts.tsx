'use client'

import Script from 'next/script'

const HeadScripts = () => {
  return (
    <>
      {/* <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      /> */}
      <Script src="/assets/js/bootstrap.min.js" />
      <Script src="/assets/js/jquery.min.js" />
      {/* <Script src="/assets/js/mmenu.js" /> */}
      {/* <Script src="/assets/js/swiper-bundle.min.js" /> */}
      {/* <Script src="/assets/js/swiper.js" /> */}
      <Script src="/assets/js/lazysize.min.js" />
      <Script src="/assets/js/rangle-slider.js" />
      <Script src="/assets/js/nouislider.min.js" />
      <Script src="/assets/js/jquery.nice-select.min.js" />
      <Script src="/assets/js/countto.js" />
      <Script src="/assets/js/magnific-popup.min.js" />
      <Script src="/assets/js/jquery.nice-select.min.js" />
      <Script src="/assets/js/rangle-slider.js" />
      <Script src="/assets/js/wow.min.js" />
      <Script src="/assets/js/main.js" />
    </>
  )
}

export default HeadScripts
