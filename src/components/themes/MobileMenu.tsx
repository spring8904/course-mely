'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Mmenu from 'mmenu-js'

const MobileMenu = () => {
  useEffect(() => {
    const menuElement = document.querySelector('#menu') as HTMLElement
    if (menuElement) {
      new Mmenu(menuElement)
    }
  }, [])
  return (
    <nav className="d-lg-none" id="menu">
      <a className="close" aria-label="Close menu" href="#wrapper">
        <i className="flaticon-close-1"></i>
      </a>
      <ul>
        <li>
          <span>Categories</span>
          <ul>
            <li>
              <span>Graphics & Design</span>
              <ul>
                <li>
                  <Link href="#">Human Resources</Link>
                </li>
                <li>
                  <Link href="#">Operations</Link>
                </li>
                <li>
                  <Link href="#">Supply Chain Management</Link>
                </li>
                <li>
                  <Link href="#">Customer Service</Link>
                </li>
                <li>
                  <Link href="#">Manufacturing</Link>
                </li>
                <li>
                  <Link href="#">Health And Safety</Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  )
}
export default MobileMenu
