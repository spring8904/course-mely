import React from 'react'

const CourseListSidebar = () => {
  return (
    <div className="tf-sidebar course">
      <div className="sidebar-item widget wg-categorie tf-collapse-item">
        <div className="sidebar-title tf-collapse-title">
          <h5 className="fw-5">Categories</h5>
          <i className="tf-collapse-icon icon-arrow-top" />
        </div>
        <ul className="tf-collapse-content showmore-item">
          <li className="checkbox-item fl-item2">
            <label>
              <p>Web Development</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(432)</span>
          </li>
          <li className="checkbox-item fl-item2">
            <label>
              <p>Software Testing</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(12)</span>
          </li>
          <li className="checkbox-item fl-item2">
            <label>
              <p>Mobile Development</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(324)</span>
          </li>
          <li className="checkbox-item fl-item2">
            <label>
              <p>Game Development</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(87)</span>
          </li>
          <li className="checkbox-item fl-item2">
            <label>
              <p>Software Engineering</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(163)</span>
          </li>
          <li className="checkbox-item fl-item2">
            <label>
              <p>Game Development</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(87)</span>
          </li>
          <li className="checkbox-item fl-item2">
            <label>
              <p>Web Development</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(432)</span>
          </li>
          <li className="checkbox-item fl-item2">
            <label>
              <p>Game Development</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(87)</span>
          </li>
          <li className="checkbox-item fl-item2">
            <label>
              <p>Software Engineering</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(163)</span>
          </li>
        </ul>
        <div className="btn-showmore showmore view-more-button">
          <span className="title">
            Show More <i className="icon icon-arrow-bottom" />
          </span>
        </div>
      </div>
      <div className="sidebar-item widget wg-categorie tf-collapse-item">
        <div className="sidebar-title tf-collapse-title">
          <h5 className="fw-5">Rating</h5>
          <i className="tf-collapse-icon icon-arrow-top" />
        </div>
        <ul className="tf-collapse-content">
          <li className="checkbox-item">
            <label>
              <div className="ratings">
                <i className="icon-star-1" />
                <i className="icon-star-1" />
                <i className="icon-star-1" />
                <i className="icon-star-1" />
                <i className="icon-star-1" />
              </div>
              <input name="input-ratings" type="radio" />
              <span className="btn-radio" />
            </label>
            <span>5</span>
          </li>
          <li className="checkbox-item">
            <label>
              <div className="ratings">
                <i className="icon-star-1" />
                <i className="icon-star-1" />
                <i className="icon-star-1" />
                <i className="icon-star-1" />
                <svg
                  width={12}
                  height={11}
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.54831 7.10382L3.58894 6.85477L3.41273 6.67416L1.16841 4.37373L4.24914 3.90314L4.51288 3.86286L4.62625 3.62134L5.99989 0.694982L7.37398 3.62182L7.48735 3.86332L7.75108 3.9036L10.8318 4.37419L8.58749 6.67462L8.41128 6.85523L8.4519 7.10428L8.98079 10.3465L6.24201 8.8325L6.00014 8.69879L5.75826 8.83247L3.01941 10.3461L3.54831 7.10382ZM11.0444 4.15626L11.0442 4.15651L11.0444 4.15626Z"
                    stroke="#131836"
                  />
                </svg>
              </div>
              <input name="input-ratings" type="radio" />
              <span className="btn-radio" />
            </label>
            <span>4</span>
          </li>
          <li className="checkbox-item">
            <label>
              <div className="ratings">
                <i className="icon-star-1" />
                <i className="icon-star-1" />
                <i className="icon-star-1" />
                <svg
                  width={12}
                  height={11}
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.54831 7.10382L3.58894 6.85477L3.41273 6.67416L1.16841 4.37373L4.24914 3.90314L4.51288 3.86286L4.62625 3.62134L5.99989 0.694982L7.37398 3.62182L7.48735 3.86332L7.75108 3.9036L10.8318 4.37419L8.58749 6.67462L8.41128 6.85523L8.4519 7.10428L8.98079 10.3465L6.24201 8.8325L6.00014 8.69879L5.75826 8.83247L3.01941 10.3461L3.54831 7.10382ZM11.0444 4.15626L11.0442 4.15651L11.0444 4.15626Z"
                    stroke="#131836"
                  />
                </svg>
                <svg
                  width={12}
                  height={11}
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.54831 7.10382L3.58894 6.85477L3.41273 6.67416L1.16841 4.37373L4.24914 3.90314L4.51288 3.86286L4.62625 3.62134L5.99989 0.694982L7.37398 3.62182L7.48735 3.86332L7.75108 3.9036L10.8318 4.37419L8.58749 6.67462L8.41128 6.85523L8.4519 7.10428L8.98079 10.3465L6.24201 8.8325L6.00014 8.69879L5.75826 8.83247L3.01941 10.3461L3.54831 7.10382ZM11.0444 4.15626L11.0442 4.15651L11.0444 4.15626Z"
                    stroke="#131836"
                  />
                </svg>
              </div>
              <input name="input-ratings" type="radio" />
              <span className="btn-radio" />
            </label>
            <span>3</span>
          </li>
          <li className="checkbox-item">
            <label>
              <div className="ratings">
                <i className="icon-star-1" />
                <i className="icon-star-1" />
                <svg
                  width={12}
                  height={11}
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.54831 7.10382L3.58894 6.85477L3.41273 6.67416L1.16841 4.37373L4.24914 3.90314L4.51288 3.86286L4.62625 3.62134L5.99989 0.694982L7.37398 3.62182L7.48735 3.86332L7.75108 3.9036L10.8318 4.37419L8.58749 6.67462L8.41128 6.85523L8.4519 7.10428L8.98079 10.3465L6.24201 8.8325L6.00014 8.69879L5.75826 8.83247L3.01941 10.3461L3.54831 7.10382ZM11.0444 4.15626L11.0442 4.15651L11.0444 4.15626Z"
                    stroke="#131836"
                  />
                </svg>
                <svg
                  width={12}
                  height={11}
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.54831 7.10382L3.58894 6.85477L3.41273 6.67416L1.16841 4.37373L4.24914 3.90314L4.51288 3.86286L4.62625 3.62134L5.99989 0.694982L7.37398 3.62182L7.48735 3.86332L7.75108 3.9036L10.8318 4.37419L8.58749 6.67462L8.41128 6.85523L8.4519 7.10428L8.98079 10.3465L6.24201 8.8325L6.00014 8.69879L5.75826 8.83247L3.01941 10.3461L3.54831 7.10382ZM11.0444 4.15626L11.0442 4.15651L11.0444 4.15626Z"
                    stroke="#131836"
                  />
                </svg>
                <svg
                  width={12}
                  height={11}
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.54831 7.10382L3.58894 6.85477L3.41273 6.67416L1.16841 4.37373L4.24914 3.90314L4.51288 3.86286L4.62625 3.62134L5.99989 0.694982L7.37398 3.62182L7.48735 3.86332L7.75108 3.9036L10.8318 4.37419L8.58749 6.67462L8.41128 6.85523L8.4519 7.10428L8.98079 10.3465L6.24201 8.8325L6.00014 8.69879L5.75826 8.83247L3.01941 10.3461L3.54831 7.10382ZM11.0444 4.15626L11.0442 4.15651L11.0444 4.15626Z"
                    stroke="#131836"
                  />
                </svg>
              </div>
              <input name="input-ratings" type="radio" />
              <span className="btn-radio" />
            </label>
            <span>2</span>
          </li>
          <li className="checkbox-item">
            <label>
              <div className="ratings">
                <i className="icon-star-1" />
                <svg
                  width={12}
                  height={11}
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.54831 7.10382L3.58894 6.85477L3.41273 6.67416L1.16841 4.37373L4.24914 3.90314L4.51288 3.86286L4.62625 3.62134L5.99989 0.694982L7.37398 3.62182L7.48735 3.86332L7.75108 3.9036L10.8318 4.37419L8.58749 6.67462L8.41128 6.85523L8.4519 7.10428L8.98079 10.3465L6.24201 8.8325L6.00014 8.69879L5.75826 8.83247L3.01941 10.3461L3.54831 7.10382ZM11.0444 4.15626L11.0442 4.15651L11.0444 4.15626Z"
                    stroke="#131836"
                  />
                </svg>
                <svg
                  width={12}
                  height={11}
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.54831 7.10382L3.58894 6.85477L3.41273 6.67416L1.16841 4.37373L4.24914 3.90314L4.51288 3.86286L4.62625 3.62134L5.99989 0.694982L7.37398 3.62182L7.48735 3.86332L7.75108 3.9036L10.8318 4.37419L8.58749 6.67462L8.41128 6.85523L8.4519 7.10428L8.98079 10.3465L6.24201 8.8325L6.00014 8.69879L5.75826 8.83247L3.01941 10.3461L3.54831 7.10382ZM11.0444 4.15626L11.0442 4.15651L11.0444 4.15626Z"
                    stroke="#131836"
                  />
                </svg>
                <svg
                  width={12}
                  height={11}
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.54831 7.10382L3.58894 6.85477L3.41273 6.67416L1.16841 4.37373L4.24914 3.90314L4.51288 3.86286L4.62625 3.62134L5.99989 0.694982L7.37398 3.62182L7.48735 3.86332L7.75108 3.9036L10.8318 4.37419L8.58749 6.67462L8.41128 6.85523L8.4519 7.10428L8.98079 10.3465L6.24201 8.8325L6.00014 8.69879L5.75826 8.83247L3.01941 10.3461L3.54831 7.10382ZM11.0444 4.15626L11.0442 4.15651L11.0444 4.15626Z"
                    stroke="#131836"
                  />
                </svg>
                <svg
                  width={12}
                  height={11}
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.54831 7.10382L3.58894 6.85477L3.41273 6.67416L1.16841 4.37373L4.24914 3.90314L4.51288 3.86286L4.62625 3.62134L5.99989 0.694982L7.37398 3.62182L7.48735 3.86332L7.75108 3.9036L10.8318 4.37419L8.58749 6.67462L8.41128 6.85523L8.4519 7.10428L8.98079 10.3465L6.24201 8.8325L6.00014 8.69879L5.75826 8.83247L3.01941 10.3461L3.54831 7.10382ZM11.0444 4.15626L11.0442 4.15651L11.0444 4.15626Z"
                    stroke="#131836"
                  />
                </svg>
              </div>
              <input name="input-ratings" type="radio" />
              <span className="btn-radio" />
            </label>
            <span>1</span>
          </li>
        </ul>
      </div>
      <div className="sidebar-item widget wg-categorie tf-collapse-item">
        <div className="sidebar-title tf-collapse-title">
          <h5 className="fw-5">Instructor</h5>
          <i className="tf-collapse-icon icon-arrow-top" />
        </div>
        <ul className="tf-collapse-content showmore-item2">
          <li className="checkbox-item fl-item3">
            <label>
              <p>Kathryn Murphy</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(89)</span>
          </li>
          <li className="checkbox-item fl-item3">
            <label>
              <p>Eleanor Pena</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(58)</span>
          </li>
          <li className="checkbox-item fl-item3">
            <label>
              <p>Theresa Webb</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(135)</span>
          </li>
          <li className="checkbox-item fl-item3">
            <label>
              <p>Bessie Cooper</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(87)</span>
          </li>
          <li className="checkbox-item fl-item3">
            <label>
              <p>Software Engineering</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(163)</span>
          </li>
          <li className="checkbox-item fl-item3">
            <label>
              <p>Game Development</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(87)</span>
          </li>
          <li className="checkbox-item fl-item3">
            <label>
              <p>Web Development</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(432)</span>
          </li>
          <li className="checkbox-item fl-item3">
            <label>
              <p>Game Development</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(87)</span>
          </li>
          <li className="checkbox-item fl-item3">
            <label>
              <p>Software Engineering</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(163)</span>
          </li>
        </ul>
        <div className="btn-showmore2 showmore view-more-button2">
          <span className="title">
            Show More <i className="icon icon-arrow-bottom" />
          </span>
        </div>
      </div>
      <div className="sidebar-item widget wg-categorie tf-collapse-item">
        <div className="sidebar-title tf-collapse-title">
          <h5 className="fw-5">Level</h5>
          <i className="tf-collapse-icon icon-arrow-top" />
        </div>
        <ul className="tf-collapse-content">
          <li className="checkbox-item">
            <label>
              <p>Beginner</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(178)</span>
          </li>
          <li className="checkbox-item">
            <label>
              <p>Intermediate</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(89)</span>
          </li>
          <li className="checkbox-item">
            <label>
              <p>Expert</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(58)</span>
          </li>
        </ul>
      </div>
      <div className="sidebar-item widget wg-categorie tf-collapse-item">
        <div className="sidebar-title tf-collapse-title">
          <h5 className="fw-5">Price</h5>
          <i className="tf-collapse-icon icon-arrow-top" />
        </div>
        <ul className="tf-collapse-content">
          <li className="checkbox-item">
            <label>
              <p>Free</p>
              <input name="input-price" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(178)</span>
          </li>
          <li className="checkbox-item">
            <label>
              <p>Paid</p>
              <input name="input-price" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(89)</span>
          </li>
        </ul>
      </div>
      <div className="sidebar-item widget wg-categorie tf-collapse-item">
        <div className="sidebar-title tf-collapse-title">
          <h5 className="fw-5">Language</h5>
          <i className="tf-collapse-icon icon-arrow-top" />
        </div>
        <ul className="tf-collapse-content showmore-item3">
          <li className="checkbox-item fl-item4">
            <label>
              <p>English</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(178)</span>
          </li>
          <li className="checkbox-item fl-item4">
            <label>
              <p>French</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(89)</span>
          </li>
          <li className="checkbox-item fl-item4">
            <label>
              <p>German</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(89)</span>
          </li>
          <li className="checkbox-item fl-item4">
            <label>
              <p>Italian</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(87)</span>
          </li>
          <li className="checkbox-item fl-item4">
            <label>
              <p>Turkish</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(163)</span>
          </li>
          <li className="checkbox-item fl-item4">
            <label>
              <p>Spain</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(87)</span>
          </li>
          <li className="checkbox-item fl-item4">
            <label>
              <p>japanese</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(432)</span>
          </li>
          <li className="checkbox-item fl-item4">
            <label>
              <p>thailand</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(87)</span>
          </li>
        </ul>
        <div className="btn-showmore3 showmore view-more-button3">
          <span className="title">
            Show More <i className="icon icon-arrow-bottom" />
          </span>
        </div>
      </div>
      <div className="sidebar-item widget wg-categorie tf-collapse-item">
        <div className="sidebar-title tf-collapse-title">
          <h5 className="fw-5">Video Duration</h5>
          <i className="tf-collapse-icon icon-arrow-top" />
        </div>
        <ul className="tf-collapse-content">
          <li className="checkbox-item">
            <label>
              <p>0-1 Hour</p>
              <input name="input-videoduration" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(178)</span>
          </li>
          <li className="checkbox-item">
            <label>
              <p>1-3 Hours</p>
              <input name="input-videoduration" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(89)</span>
          </li>
          <li className="checkbox-item">
            <label>
              <p>3-6 Hours</p>
              <input name="input-videoduration" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(58)</span>
          </li>
        </ul>
      </div>
      <div className="sidebar-item widget wg-categorie tf-collapse-item">
        <div className="sidebar-title tf-collapse-title">
          <h5 className="fw-5">Features</h5>
          <i className="tf-collapse-icon icon-arrow-top" />
        </div>
        <ul className="tf-collapse-content">
          <li className="checkbox-item">
            <label>
              <p>Subtitle</p>
              <input name="input-features" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(178)</span>
          </li>
          <li className="checkbox-item">
            <label>
              <p>Quizzes</p>
              <input name="input-features" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(89)</span>
          </li>
          <li className="checkbox-item">
            <label>
              <p>Coding Exercises</p>
              <input name="input-features" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>(58)</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CourseListSidebar
