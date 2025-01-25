import React from 'react'

const SummaryCards = () => {
  return (
    <div>
      <section className="section-icons">
        <div className="row">
          <div className="icons-items">
            <div className="icons-box style-4 wow fadeInUp">
              <div className="icons">
                <i className="flaticon-play-2"></i>
              </div>
              <div className="content">
                <h6>Total Course</h6>
                <span className="num-count fs-26 fw-5">90</span>
              </div>
            </div>
            <div
              className="icons-box style-4 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="icons">
                <i className="flaticon-alarm"></i>
              </div>
              <div className="content">
                <h6>Published Course</h6>
                <span className="num-count fs-26 fw-5">28</span>
              </div>
            </div>
            <div
              className="icons-box style-4 wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <div className="icons">
                <i className="flaticon-video"></i>
              </div>
              <div className="content">
                <h6>Pending Course</h6>
                <span className="num-count fs-26 fw-5">45</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SummaryCards
