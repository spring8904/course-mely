import React from 'react'
import Image from 'next/image'

const QuizDetail = () => {
  return (
    <div>
      <div className="box-3 section-right">
        <div className="heading-section flex items-center justify-between">
          <h6 className="fw-5 fs-22 wow fadeInUp">
            <Image layout="fill" src="/assets/images/item/react.jpg" alt="" />
            React Basic Quiz
          </h6>
          <span
            className="fs-15 wow fadeInUp flex items-center"
            data-wow-delay="0.1s"
          >
            <i className="flaticon-clock"></i>
            00:05:55
          </span>
        </div>
        <div className="line">
          <div className="progress">
            <div className="progress-bar">
              <div
                aria-valuenow={80}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>
          <div className="exam-progress">
            <span className="fw-5 fs-15">Exam Progress:</span>
            <span className="fw-5 fs-15">Question 1 out of 5</span>
          </div>
        </div>
        <div className="quiz">
          <div className="question">
            <p className="wow fadeInUp">Question 1</p>
            <h5 className="fw-5 fs-20 wow fadeInUp" data-wow-delay="0.1s">
              React is mainly used for building ___.
            </h5>
          </div>
          <div className="answers wow fadeInUp">
            <div className="radio-item">
              <label htmlFor="radio1">
                <p>Datebase</p>
                <input name="radio" type="radio" id="radio1" />
                <span className="btn-radio"></span>
              </label>
            </div>
            <div className="radio-item">
              <label htmlFor="radio2">
                <p>Connectivity</p>
                <input name="radio" type="radio" id="radio2" />
                <span className="btn-radio"></span>
              </label>
            </div>
            <div className="radio-item">
              <label htmlFor="radio3">
                <p>User interface</p>
                <input name="radio" type="radio" id="radio3" />
                <span className="btn-radio"></span>
              </label>
            </div>
            <div className="radio-item">
              <label htmlFor="radio4">
                <p>Design Platform</p>
                <input name="radio" type="radio" id="radio4" checked />
                <span className="btn-radio"></span>
              </label>
            </div>
          </div>
          <a href="#" type="submit" className="tf-btn">
            Next <i className="icon-arrow-top-right"></i>
          </a>
        </div>
        <div className="quiz">
          <div className="question">
            <p className="wow fadeInUp">Question 2</p>
            <a className="fw-5 fs-20 wow fadeInUp" data-wow-delay="0.1s">
              What’s the difference between a 301 and a 302 redirect?
            </a>
          </div>
          <div className="answers wow fadeInUp">
            <div className="checkbox-item">
              <label htmlFor="checkbox1">
                <p className="fs-15">
                  301 is used for a permanent page redirection, 302 for a
                  temporary redirection
                </p>
                <input name="checkbox" id="checkbox1" type="radio" />
                <span className="btn-checkbox"></span>
              </label>
            </div>
            <div className="checkbox-item">
              <label htmlFor="checkbox2">
                <p className="fs-15">
                  301 is used for a permanent page redirection, 302 for a
                  temporary redirection
                </p>
                <input name="checkbox" id="checkbox2" type="radio" checked />
                <span className="btn-checkbox"></span>
              </label>
            </div>
            <div className="checkbox-item">
              <label htmlFor="checkbox3">
                <p className="fs-15">
                  301 is used for a permanent page redirection, 302 for a
                  temporary redirection
                </p>
                <input name="checkbox" id="checkbox3" type="radio" />
                <span className="btn-checkbox"></span>
              </label>
            </div>
            <div className="checkbox-item">
              <label htmlFor="checkbox4">
                <p className="fs-15">
                  301 is used for a permanent page redirection, 302 for a
                  temporary redirection.
                </p>
                <input name="checkbox" id="checkbox4" type="radio" />
                <span className="btn-checkbox"></span>
              </label>
            </div>
          </div>
          <a href="#" type="submit" className="tf-btn">
            Next <i className="icon-arrow-top-right"></i>
          </a>
        </div>
        <div className="quiz">
          <div className="question">
            <p className="wow fadeInUp">Question 3</p>
            <h5 className="fw-5 fs-20 wow fadeInUp" data-wow-delay="0.1s">
              ___ can be done while multiple elements need to be returned from a
              component.
            </h5>
          </div>
          <div className="answers style-2 wow fadeInUp">
            <div className="answer">Abstraction</div>
            <div className="answer">Packing</div>
            <div className="answer">Insulation</div>
            <div className="answer">Wrapping</div>
          </div>
          <a href="#" type="submit" className="tf-btn">
            Finish Quiz <i className="icon-arrow-top-right"></i>
          </a>
        </div>
      </div>
    </div>
  )
}

export default QuizDetail
