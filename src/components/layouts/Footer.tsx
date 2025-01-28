type ContactInfo = {
  phone: string
  email: string
  address: string
}

// const FooterColumn = ({
//   title,
//   links,
// }: {
//   title: string
//   links: { href: string; label: string }[]
// }) => (
//   <div>
//     <h2 className="mb-4 text-xl font-bold">{title}</h2>
//     <ul className="space-y-4">
//       {links.map((link) => (
//         <li key={`${link.label}-${link.href}`}>
//           <Link href={link.href} className="hover:underline">
//             {link.label}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   </div>
// )

const Footer = () => {
  const contactInfo: ContactInfo = {
    phone: '0868313293',
    email: 'coursehub.support@gmail.com',
    address: 'Trịnh Văn Bô, Nam Từ Liêm, TP. Hà Nội',
  }

  return (
    <footer id="footer" className="footer">
      <div className="footer-wrap">
        <div className="footer-body">
          <div className="tf-container">
            <div className="row">
              <div className="col-12">
                <div className="footer-body-wrap flex justify-between">
                  <div
                    className="footer-more-infor wow fadeInUp"
                    data-wow-delay="0s"
                  >
                    <div className="footer-logo">
                      <a href="#">
                        <img src="/images/logo/logo.svg" alt="" />
                      </a>
                    </div>
                    <ul className="address">
                      <li className="flex items-center gap-10">
                        <div className="icon">
                          <i className="flaticon-call" />
                        </div>
                        <p>Điện thoai: {contactInfo.phone}</p>
                      </li>
                      <li className="flex items-center gap-10">
                        <div className="icon">
                          <i className="flaticon-mail-1" />
                        </div>
                        <p>Email: {contactInfo.email}</p>
                      </li>
                      <li className="flex items-center gap-10">
                        <div className="icon">
                          <i className="flaticon-location" />
                        </div>
                        <p>Địa chỉ: {contactInfo.address}</p>
                      </li>
                    </ul>
                    <ul className="tf-social-icon flex items-center gap-10">
                      <li>
                        <a href="#">
                          <i className="flaticon-facebook-1" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="icon-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="flaticon-instagram" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="flaticon-linkedin-1" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="footer-menu-list wow fadeInUp"
                    data-wow-delay="0.2s"
                  >
                    <h5 className="fw-5">Về chúng tôi</h5>
                    <ul>
                      <li>
                        <a href="#">Giới thiệu</a>
                      </li>
                      <li>
                        <a href="#">Liên hệ</a>
                      </li>
                      <li>
                        <a href="#">Blog</a>
                      </li>
                      <li>
                        <a href="#">Điều khoản</a>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="footer-menu-list wow fadeInUp"
                    data-wow-delay="0.3s"
                  >
                    <h5 className="fw-5">Chính sách và điều khoản</h5>
                    <ul>
                      <li>
                        <a href="#">Chính sách bảo mật</a>
                      </li>
                      <li>
                        <a href="#">Điều khoản dịch vụ</a>
                      </li>
                      <li>
                        <a href="#">Chính sách hoàn tiền</a>
                      </li>
                      <li>
                        <a href="#">Chính sách xử lý khiếu nại</a>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="footer-menu-list wow fadeInUp"
                    data-wow-delay="0.4s"
                  >
                    <h5 className="fw-5">Hỗ trợ khách hàng</h5>
                    <ul>
                      <li>
                        <a href="#">Câu hỏi thường gặp</a>
                      </li>
                      <li>
                        <a href="#">Hướng dẫn sử dụng</a>
                      </li>
                      <li>
                        <a href="#">Gửi yêu cầu hỗ trợ</a>
                      </li>
                      <li>
                        <a href="#">Liên hệ bộ phận CSKH</a>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="footer-subscribe wow fadeInUp"
                    data-wow-delay="0.5s"
                  >
                    <h5 className="fw-5">Subscribe</h5>
                    <p>
                      2000+ Our students are subscribe Around the World. Don’t
                      be shy introduce yourself!
                    </p>
                    <form className="form-subscribe style-line-bottom">
                      <fieldset className="email">
                        <input
                          type="email"
                          placeholder="Your e-mail"
                          className="style-default"
                          name="email"
                          tabIndex={2}
                          defaultValue=""
                          aria-required="true"
                        />
                      </fieldset>
                      <div className="button-submit">
                        <button className="tf-btn-arrow" type="submit">
                          Send
                          <i className="icon-arrow-top-right" />
                        </button>
                      </div>
                    </form>
                    <h5 className="fw-5 get-app">Get the app</h5>
                    <ul className="tf-app-download">
                      <li>
                        <a href="#">
                          <div className="icon">
                            <i className="icon-apple" />
                          </div>
                          <div className="app">
                            <div>Download on the</div>
                            <div>Apple Store</div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div className="icon">
                            <i className="icon-chplay" />
                          </div>
                          <div className="app">
                            <div>Get in on</div>
                            <div>Google Play</div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom wow fadeInUp" data-wow-delay="0s">
          <div className="tf-container">
            <div className="row">
              <div className="col-12">
                <div className="footer-bottom-wrap flex items-center justify-center">
                  <p>
                    ©&nbsp;2025&nbsp;CourseMeLy. Nền tảng học trực tuyến hàng
                    đầu Việt Nam
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
