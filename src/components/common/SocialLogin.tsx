'use client'
import Link from 'next/link'
import GoogleLoginButton from '@/app/(website)/test/page'

const SocialLogin = () => {
  return (
    <ul className="login-social">
      <li className="login-social-icon">
        <Link href="#" className="tf-btn wow fadeInUp" data-wow-delay="0s">
          <i className="flaticon-facebook-1" /> Facebook
        </Link>
      </li>
      <li className="login-social-icon">
        <button className="tf-btn wow fadeInUp" data-wow-delay="0.1s">
          {/*<i className="icon-google" /> Google*/}
          <GoogleLoginButton />
        </button>
      </li>
      <li className="login-social-icon">
        <Link href="#" className="tf-btn wow fadeInUp" data-wow-delay="0.2s">
          <i className="icon-apple" /> Apple
        </Link>
      </li>
    </ul>
  )
}

export default SocialLogin
