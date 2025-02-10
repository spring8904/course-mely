'use client'

import { useEffect } from 'react'
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
                  <a href="#">Human Resources</a>
                </li>
                <li>
                  <a href="#">Operations</a>
                </li>
                <li>
                  <a href="#">Supply Chain Management</a>
                </li>
                <li>
                  <a href="#">Customer Service</a>
                </li>
                <li>
                  <a href="#">Manufacturing</a>
                </li>
                <li>
                  <a href="#">Health And Safety</a>
                </li>
                <li>
                  <a href="#">Quality Management</a>
                </li>
                <li>
                  <a href="#">E-commerce</a>
                </li>
                <li>
                  <a href="#">Management</a>
                </li>
                <li>
                  <a href="#">Sales</a>
                </li>
              </ul>
            </li>
            <li>
              <span>Digital Marketing</span>
              <ul>
                <li>
                  <a href="#">Human Resources</a>
                </li>
                <li>
                  <a href="#">Operations</a>
                </li>
                <li>
                  <a href="#">Supply Chain Management</a>
                </li>
                <li>
                  <a href="#">Customer Service</a>
                </li>
                <li>
                  <a href="#">Manufacturing</a>
                </li>
                <li>
                  <a href="#">Health And Safety</a>
                </li>
                <li>
                  <a href="#">Quality Management</a>
                </li>
                <li>
                  <a href="#">E-commerce</a>
                </li>
                <li>
                  <a href="#">Management</a>
                </li>
                <li>
                  <a href="#">Sales</a>
                </li>
              </ul>
            </li>
            <li>
              <span>Business</span>
              <ul>
                <li>
                  <a href="#">Human Resources</a>
                </li>
                <li>
                  <a href="#">Operations</a>
                </li>
                <li>
                  <a href="#">Supply Chain Management</a>
                </li>
                <li>
                  <a href="#">Customer Service</a>
                </li>
                <li>
                  <a href="#">Manufacturing</a>
                </li>
                <li>
                  <a href="#">Health And Safety</a>
                </li>
                <li>
                  <a href="#">Quality Management</a>
                </li>
                <li>
                  <a href="#">E-commerce</a>
                </li>
                <li>
                  <a href="#">Management</a>
                </li>
                <li>
                  <a href="#">Sales</a>
                </li>
              </ul>
            </li>
            <li>
              <span>Music & Audio</span>
              <ul>
                <li>
                  <a href="#">Human Resources</a>
                </li>
                <li>
                  <a href="#">Operations</a>
                </li>
                <li>
                  <a href="#">Supply Chain Management</a>
                </li>
                <li>
                  <a href="#">Customer Service</a>
                </li>
                <li>
                  <a href="#">Manufacturing</a>
                </li>
                <li>
                  <a href="#">Health And Safety</a>
                </li>
                <li>
                  <a href="#">Quality Management</a>
                </li>
                <li>
                  <a href="#">E-commerce</a>
                </li>
                <li>
                  <a href="#">Management</a>
                </li>
                <li>
                  <a href="#">Sales</a>
                </li>
              </ul>
            </li>
            <li>
              <span>Data</span>
              <ul>
                <li>
                  <a href="#">Human Resources</a>
                </li>
                <li>
                  <a href="#">Operations</a>
                </li>
                <li>
                  <a href="#">Supply Chain Management</a>
                </li>
                <li>
                  <a href="#">Customer Service</a>
                </li>
                <li>
                  <a href="#">Manufacturing</a>
                </li>
                <li>
                  <a href="#">Health And Safety</a>
                </li>
                <li>
                  <a href="#">Quality Management</a>
                </li>
                <li>
                  <a href="#">E-commerce</a>
                </li>
                <li>
                  <a href="#">Management</a>
                </li>
                <li>
                  <a href="#">Sales</a>
                </li>
              </ul>
            </li>
            <li>
              <span>Video & Animation</span>
              <ul>
                <li>
                  <a href="#">Human Resources</a>
                </li>
                <li>
                  <a href="#">Operations</a>
                </li>
                <li>
                  <a href="#">Supply Chain Management</a>
                </li>
                <li>
                  <a href="#">Customer Service</a>
                </li>
                <li>
                  <a href="#">Manufacturing</a>
                </li>
                <li>
                  <a href="#">Health And Safety</a>
                </li>
                <li>
                  <a href="#">Quality Management</a>
                </li>
                <li>
                  <a href="#">E-commerce</a>
                </li>
                <li>
                  <a href="#">Management</a>
                </li>
                <li>
                  <a href="#">Sales</a>
                </li>
              </ul>
            </li>
            <li>
              <span>Photography</span>
              <ul>
                <li>
                  <a href="#">Human Resources</a>
                </li>
                <li>
                  <a href="#">Operations</a>
                </li>
                <li>
                  <a href="#">Supply Chain Management</a>
                </li>
                <li>
                  <a href="#">Customer Service</a>
                </li>
                <li>
                  <a href="#">Manufacturing</a>
                </li>
                <li>
                  <a href="#">Health And Safety</a>
                </li>
                <li>
                  <a href="#">Quality Management</a>
                </li>
                <li>
                  <a href="#">E-commerce</a>
                </li>
                <li>
                  <a href="#">Management</a>
                </li>
                <li>
                  <a href="#">Sales</a>
                </li>
              </ul>
            </li>
            <li>
              <span>Lifestyle</span>
              <ul>
                <li>
                  <a href="#">Human Resources</a>
                </li>
                <li>
                  <a href="#">Operations</a>
                </li>
                <li>
                  <a href="#">Supply Chain Management</a>
                </li>
                <li>
                  <a href="#">Customer Service</a>
                </li>
                <li>
                  <a href="#">Manufacturing</a>
                </li>
                <li>
                  <a href="#">Health And Safety</a>
                </li>
                <li>
                  <a href="#">Quality Management</a>
                </li>
                <li>
                  <a href="#">E-commerce</a>
                </li>
                <li>
                  <a href="#">Management</a>
                </li>
                <li>
                  <a href="#">Sales</a>
                </li>
              </ul>
            </li>
            <li>
              <span>Writing & Translation</span>
              <ul>
                <li>
                  <a href="#">Human Resources</a>
                </li>
                <li>
                  <a href="#">Operations</a>
                </li>
                <li>
                  <a href="#">Supply Chain Management</a>
                </li>
                <li>
                  <a href="#">Customer Service</a>
                </li>
                <li>
                  <a href="#">Manufacturing</a>
                </li>
                <li>
                  <a href="#">Health And Safety</a>
                </li>
                <li>
                  <a href="#">Quality Management</a>
                </li>
                <li>
                  <a href="#">E-commerce</a>
                </li>
                <li>
                  <a href="#">Management</a>
                </li>
                <li>
                  <a href="#">Sales</a>
                </li>
              </ul>
            </li>
            <li>
              <span>Programming & Tech</span>
              <ul>
                <li>
                  <a href="#">Human Resources</a>
                </li>
                <li>
                  <a href="#">Operations</a>
                </li>
                <li>
                  <a href="#">Supply Chain Management</a>
                </li>
                <li>
                  <a href="#">Customer Service</a>
                </li>
                <li>
                  <a href="#">Manufacturing</a>
                </li>
                <li>
                  <a href="#">Health And Safety</a>
                </li>
                <li>
                  <a href="#">Quality Management</a>
                </li>
                <li>
                  <a href="#">E-commerce</a>
                </li>
                <li>
                  <a href="#">Management</a>
                </li>
                <li>
                  <a href="#">Sales</a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="current">
          <span>Home</span>
          <ul>
            <li className="current">
              <a href="index.html">Home Page 01</a>
            </li>
            <li>
              <a href="home-02.html">Home Page 02</a>
            </li>
            <li>
              <a href="home-03.html">Home Page 03</a>
            </li>
            <li>
              <a href="home-04.html">Home Page 04</a>
            </li>
            <li>
              <a href="home-05.html">Home Page 05</a>
            </li>
            <li>
              <a href="home-06.html">Home Page 06</a>
            </li>
            <li>
              <a href="home-07.html">Home Page 07</a>
            </li>
            <li>
              <a href="home-08.html">Home Page 08</a>
            </li>
            <li>
              <a href="home-09.html">Home Page 09</a>
            </li>
            <li>
              <a href="home-10.html">Home Page 10</a>
            </li>
          </ul>
        </li>
        <li>
          <span>Courses</span>
          <ul>
            <li>
              <span>Course List</span>
              <ul>
                <li>
                  <a href="#">Course Grid Basic</a>
                </li>
                <li>
                  <a href="#">Course Grid Modern</a>
                </li>
                <li>
                  <a href="#">Course Grid Left Sidebar</a>
                </li>
                <li>
                  <a href="#">Course Grid Right Sidebar</a>
                </li>
                <li>
                  <a href="course-list-sidebar.html">Course List Sidebar</a>
                </li>
                <li>
                  <a href="all-list-style.html">Course All List Style</a>
                </li>
              </ul>
            </li>
            <li>
              <span>Course Single</span>
              <ul>
                <li>
                  <a href="#">Course Single 01</a>
                </li>
                <li>
                  <a href="#">Course Single 02</a>
                </li>
                <li>
                  <a href="#">Course Single 03</a>
                </li>
                <li>
                  <a href="#">Course Single 04</a>
                </li>
                <li>
                  <a href="#">Course Single 05</a>
                </li>
              </ul>
            </li>
            <li>
              <span>Course Category</span>
              <ul>
                <li>
                  <a href="#">Coaching</a>
                </li>
                <li>
                  <a href="#">Categories</a>
                </li>
                <li>
                  <a href="#">Online Business</a>
                </li>
                <li>
                  <a href="#">Photography</a>
                </li>
                <li>
                  <a href="#">Music & Audio</a>
                </li>
                <li>
                  <a href="#">Photography</a>
                </li>
                <li>
                  <a href="#">Programming & Tech</a>
                </li>
                <li>
                  <a href="#">Graphics & Design</a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <span>Pages</span>
          <ul>
            <li>
              <a href="instructor-list.html">Instructor List</a>
            </li>
            <li>
              <a href="instructor-single.html">Instructor Single</a>
            </li>
            <li>
              <a href="become-teacher.html">Become a Teacher</a>
            </li>
            <li>
              <a href="event-list.html">Event List </a>
            </li>
            <li>
              <a href="event-single.html">Event Single</a>
            </li>
            <li>
              <a href="about.html">About</a>
            </li>
            <li>
              <a href="contact.html">Contact</a>
            </li>
            <li>
              <a href="help-center.html">Help Center</a>
            </li>
            <li>
              <a href="pricing.html">Pricing</a>
            </li>
            <li>
              <a href="faq.html">Faq</a>
            </li>
            <li>
              <a href="terms.html">Terms</a>
            </li>
            <li>
              <a href="404.html">404</a>
            </li>
            <li>
              <a href="login.html">Login</a>
            </li>
            <li>
              <a href="register.html">Register</a>
            </li>
            <li>
              <a href="instructor-dashboard.html">Instructor Dashboard</a>
            </li>
            <li>
              <a href="student-dashboard.html">Student Dashboard</a>
            </li>
            <li>
              <a href="ui-elements.html">UI elements</a>
            </li>
          </ul>
        </li>
        <li>
          <span>Blog</span>
          <ul>
            <li>
              <a href="blog-grid.html">Blog Grid</a>
            </li>
            <li>
              <a href="blog-list-v1.html">Blog List 01</a>
            </li>
            <li>
              <a href="blog-list-v2.html">Blog List 02</a>
            </li>
            <li>
              <a href="blog-single.html">Blog Single</a>
            </li>
          </ul>
        </li>
        <li>
          <span>Shop</span>
          <ul>
            <li>
              <a href="shop-list.html">Shop List</a>
            </li>
            <li>
              <a href="shop-single.html">Shop Single</a>
            </li>
            <li>
              <a href="shop-cart.html">Shop Cart</a>
            </li>
            <li>
              <a href="shop-checkout.html">Shop Checkout</a>
            </li>
            <li>
              <a href="shop-order.html">Shop Order</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  )
}
export default MobileMenu
