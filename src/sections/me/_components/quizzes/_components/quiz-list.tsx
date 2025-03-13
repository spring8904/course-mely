import React from 'react'
import Image from 'next/image'

const QuizList = () => {
  return (
    <div className="box-1 section-right">
      <div className="heading-section mb-0 flex items-center justify-between">
        <h6 className="fw-5 fs-22 wow fadeInUp">Quiz</h6>
        <a href="#" className="tf-btn-arrow wow fadeInUp" data-wow-delay="0.1s">
          Add New Quiz <i className="icon-arrow-top-right"></i>
        </a>
      </div>
      <div className="table-box-1">
        <ul>
          <li>
            <div className="list-quizzes border-bottom wow fadeInUp flex items-center">
              <div className="img-name">
                <Image
                  layout="fill"
                  src="/assets/images/item/js.jpg"
                  data-src="/assets/images/item/js.jpg"
                  alt=""
                />
                <a href="#" className="fs-15 fw-5">
                  Javascript Basic Quiz
                </a>
              </div>
              <div className="icons">
                <div className="meta">
                  <div className="meta-item">
                    <i className="flaticon-question"></i>
                    <p>15 Questions</p>
                  </div>
                  <div className="meta-item">
                    <i className="flaticon-clock"></i>
                    <p>30 Minutes</p>
                  </div>
                  <div className="meta-item">
                    <i className="flaticon-book"></i>
                    <p>Result</p>
                  </div>
                </div>
              </div>
              <div className="selling-course-btn btn-style-2">
                <a href="#" className="btn-edit btn">
                  <i className="flaticon-setting-1"></i>
                </a>
                <a href="#" className="btn-remove btn">
                  <i className="flaticon-close"></i>
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="list-quizzes border-bottom wow fadeInUp flex items-center">
              <div className="img-name">
                <Image
                  layout="fill"
                  src="/assets/images/item/react.jpg"
                  data-src="/assets/images/item/react.jpg"
                  alt=""
                />
                <a href="#" className="fs-15 fw-5">
                  React Basic Quiz
                </a>
              </div>
              <div className="icons">
                <div className="meta">
                  <div className="meta-item">
                    <i className="flaticon-question"></i>
                    <p>15 Questions</p>
                  </div>
                  <div className="meta-item">
                    <i className="flaticon-clock"></i>
                    <p>30 Minutes</p>
                  </div>
                  <div className="meta-item">
                    <i className="flaticon-book"></i>
                    <p>Result</p>
                  </div>
                </div>
              </div>
              <div className="selling-course-btn btn-style-2">
                <a href="#" className="btn-edit btn">
                  <i className="flaticon-setting-1"></i>
                </a>
                <a href="#" className="btn-remove btn">
                  <i className="flaticon-close"></i>
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="list-quizzes border-bottom wow fadeInUp flex items-center">
              <div className="img-name">
                <Image
                  layout="fill"
                  src="/assets/images/item/css.jpg"
                  data-src="/assets/images/item/css.jpg"
                  alt=""
                />
                <a href="#" className="fs-15 fw-5">
                  CSS Beginner Quiz
                </a>
              </div>
              <div className="icons">
                <div className="meta">
                  <div className="meta-item">
                    <i className="flaticon-question"></i>
                    <p>15 Questions</p>
                  </div>
                  <div className="meta-item">
                    <i className="flaticon-clock"></i>
                    <p>30 Minutes</p>
                  </div>
                  <div className="meta-item">
                    <i className="flaticon-book"></i>
                    <p>Result</p>
                  </div>
                </div>
              </div>
              <div className="selling-course-btn btn-style-2">
                <a href="#" className="btn-edit btn">
                  <i className="flaticon-setting-1"></i>
                </a>
                <a href="#" className="btn-remove btn">
                  <i className="flaticon-close"></i>
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="list-quizzes border-bottom wow fadeInUp flex items-center">
              <div className="img-name">
                <Image
                  layout="fill"
                  src="/assets/images/item/vue.jpg"
                  data-src="/assets/images/item/vue.jpg"
                  alt=""
                />
                <a href="#" className="fs-15 fw-5">
                  Vue.js Basic Quiz
                </a>
              </div>
              <div className="icons">
                <div className="meta">
                  <div className="meta-item">
                    <i className="flaticon-question"></i>
                    <p>15 Questions</p>
                  </div>
                  <div className="meta-item">
                    <i className="flaticon-clock"></i>
                    <p>30 Minutes</p>
                  </div>
                  <div className="meta-item">
                    <i className="flaticon-book"></i>
                    <p>Result</p>
                  </div>
                </div>
              </div>
              <div className="selling-course-btn btn-style-2">
                <a href="#" className="btn-edit btn">
                  <i className="flaticon-setting-1"></i>
                </a>
                <a href="#" className="btn-remove btn">
                  <i className="flaticon-close"></i>
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="list-quizzes wow fadeInUp flex items-center">
              <div className="img-name">
                <Image
                  layout="fill"
                  src="/assets/images/item/html5.jpg"
                  data-src="/assets/images/item/html5.jpg"
                  alt=""
                />
                <a href="#" className="fs-15 fw-5">
                  HTML 5 Basic Quiz
                </a>
              </div>
              <div className="icons">
                <div className="meta">
                  <div className="meta-item">
                    <i className="flaticon-question"></i>
                    <p>15 Questions</p>
                  </div>
                  <div className="meta-item">
                    <i className="flaticon-clock"></i>
                    <p>30 Minutes</p>
                  </div>
                  <div className="meta-item">
                    <i className="flaticon-book"></i>
                    <p>Result</p>
                  </div>
                </div>
              </div>
              <div className="selling-course-btn btn-style-2">
                <a href="#" className="btn-edit btn">
                  <i className="flaticon-setting-1"></i>
                </a>
                <a href="#" className="btn-remove btn">
                  <i className="flaticon-close"></i>
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default QuizList
