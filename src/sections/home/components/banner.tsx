import Image from 'next/image'
import Link from 'next/link'

const Banner = () => {
  return (
    <div className="page-title-home1">
      <div className="tf-container">
        <div className="row items-center">
          <div className="col-lg-7">
            <div className="content">
              <div className="box-sub-tag wow fadeInUp" data-wow-delay="0s">
                <div className="sub-tag-icon">
                  <i className="icon-flash" />
                </div>
                <div className="sub-tag-title">
                  <p>The Leader in Online Learning</p>
                </div>
              </div>
              <h1
                className="fw-7 font-cardo wow fadeInUp"
                data-wow-delay="0.1s"
              >
                Get
                <span className="tf-secondary-color">2500+</span>
                Best Online <br />
                Courses From UpSkilll
              </h1>
              <h6 className="wow fadeInUp" data-wow-delay="0.2s">
                Start, switch, or advance your career with more than 5,000
                courses, <br />
                Professional Certificates, and degrees from world-class
                universities and <br />
                companies.
              </h6>
              <div className="bottom-btns">
                <Link
                  href="#"
                  className="tf-btn wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  Get Started
                  <i className="icon-arrow-top-right" />
                </Link>
                <Link
                  href="#"
                  className="tf-btn style-third wow fadeInUp"
                  data-wow-delay="0.4s"
                >
                  Explore courses
                  <i className="icon-arrow-top-right" />
                </Link>
                <div className="box-agent wow fadeInUp" data-wow-delay="0.5s">
                  <ul className="agent-img-list">
                    <li className="agent-img-item">
                      <Image
                        width={40}
                        height={40}
                        className="ls-is-cached lazyloaded"
                        data-src="/assets/images/avatar/user-1.png"
                        src="/assets/images/avatar/user-1.png"
                        alt=""
                      />
                    </li>
                    <li className="agent-img-item">
                      <Image
                        width={40}
                        height={40}
                        className="ls-is-cached lazyloaded"
                        data-src="/assets/images/avatar/user-2.png"
                        src="/assets/images/avatar/user-2.png"
                        alt=""
                      />
                    </li>
                    <li className="agent-img-item">
                      <Image
                        width={40}
                        height={40}
                        className="ls-is-cached lazyloaded"
                        data-src="/assets/images/avatar/user-3.png"
                        src="/assets/images/avatar/user-3.png"
                        alt=""
                      />
                    </li>
                  </ul>
                  <div className="rate">
                    <div className="ratings">
                      <i className="icon-star" />
                      <i className="icon-star" />
                      <i className="icon-star" />
                      <i className="icon-star" />
                      <i className="icon-star" />
                    </div>
                    <div className="number-rate">35k+ happy students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="image">
              <Image
                width={480}
                height={581}
                className="lazyload"
                data-src="/assets/images/page-title/page-title-home1.png"
                src="/assets/images/page-title/page-title-home1.png"
                alt=""
              />
              <Image
                width={121}
                height={121}
                quality={100}
                className="item1 animate-cir45"
                src="/assets/images/item/item-1.png"
                alt=""
              />
              <Image
                width={121}
                height={121}
                quality={100}
                className="item2 animate-dot-anim-2"
                src="/assets/images/item/item-2.png"
                alt=""
              />
              <Image
                width={121}
                height={121}
                quality={100}
                className="item3 animate-dot-anim-3"
                src="/assets/images/item/item-3.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Banner
