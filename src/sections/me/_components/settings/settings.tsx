import React, { useState } from 'react'

const MeSetting = () => {
  const [activeTab, setActiveTab] = useState('Profile')

  return (
    <div>
      <div className="section-setting-right section-right">
        <div className="box">
          <div className="widget-tabs style-small">
            {/* Tab Menu */}
            <ul className="widget-menu-tab overflow-x-auto">
              <li
                className={`item-title ${activeTab === 'Profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('Profile')}
              >
                Profile
              </li>
              <li
                className={`item-title ${activeTab === 'Password' ? 'active' : ''}`}
                onClick={() => setActiveTab('Password')}
              >
                Password
              </li>
              <li
                className={`item-title ${activeTab === 'Social' ? 'active' : ''}`}
                onClick={() => setActiveTab('Social')}
              >
                Social
              </li>
            </ul>
            {/* Tab Content */}
            <div className="widget-content-tab">
              {activeTab === 'Profile' && (
                <div className="widget-content-inner active">
                  <div className="row">
                    <div className="profile-wrap">
                      <div className="profile-img">
                        <img
                          id="profile-img"
                          src="/assets/images/avatar/review-1.png"
                          alt=""
                        />
                      </div>
                      <div className="profile-info">
                        <h4>Your avatar</h4>
                        <label id="name-file">
                          PNG or JPG no bigger than 800px wide and tall.
                        </label>
                      </div>
                      <div className="profile-btn">
                        <input id="file-input" type="file" />
                        <button className="btn-update tf-button-default">
                          Update <i className="icon-arrow-top-right"></i>
                        </button>
                        <a href="#" className="btn-delete tf-button-default">
                          Delete <i className="icon-arrow-top-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <form action="#" className="shop-checkout">
                    <div className="cols">
                      <fieldset className="tf-field">
                        <input
                          className="tf-input style-1"
                          id="field1"
                          type="text"
                          placeholder=""
                          name="text"
                          tabIndex={2}
                          defaultValue=""
                          aria-required="true"
                        />
                        <label
                          className="tf-field-label fs-15"
                          htmlFor="field1"
                        >
                          First Name
                        </label>
                      </fieldset>
                      <fieldset className="tf-field">
                        <input
                          className="tf-input style-1"
                          id="field2"
                          type="text"
                          placeholder=""
                          name="text"
                          tabIndex={2}
                          defaultValue=""
                          aria-required="true"
                        />
                        <label
                          className="tf-field-label fs-15"
                          htmlFor="field2"
                        >
                          Last Name
                        </label>
                      </fieldset>
                    </div>
                    <div className="cols">
                      <fieldset className="tf-field">
                        <input
                          className="tf-input style-1"
                          id="field1"
                          type="text"
                          placeholder=""
                          name="text"
                          tabIndex={2}
                          defaultValue=""
                          aria-required="true"
                        />
                        <label
                          className="tf-field-label fs-15"
                          htmlFor="field1"
                        >
                          User Name
                        </label>
                      </fieldset>
                      <fieldset className="tf-field">
                        <input
                          className="tf-input style-1"
                          id="field2"
                          type="text"
                          placeholder=""
                          name="text"
                          tabIndex={2}
                          defaultValue=""
                          aria-required="true"
                        />
                        <label
                          className="tf-field-label fs-15"
                          htmlFor="field2"
                        >
                          Phone Number
                        </label>
                      </fieldset>
                    </div>
                    <fieldset className="tf-field">
                      <input
                        className="tf-input style-1"
                        id="field4"
                        type="text"
                        placeholder=""
                        name="text"
                        tabIndex={2}
                        defaultValue=""
                        aria-required="true"
                      />
                      <label className="tf-field-label fs-15" htmlFor="field4">
                        Skill/Occupation
                      </label>
                    </fieldset>
                    <fieldset className="tf-field">
                      <textarea
                        className="tf-input style-1"
                        name="message"
                        rows={4}
                        placeholder=""
                        tabIndex={2}
                        aria-required="true"
                        defaultValue={'Bio\n'}
                      />
                      <label
                        className="tf-field-label type-textarea fs-15"
                        htmlFor=""
                      >
                        Message
                      </label>
                    </fieldset>
                  </form>
                  <a href="#" type="submit" className="tf-btn">
                    Update Profile <i className="icon-arrow-top-right" />
                  </a>
                </div>
              )}
              {activeTab === 'Password' && (
                <div className="widget-content-inner">
                  <form action="#" className="shop-checkout">
                    <fieldset className="tf-field">
                      <input
                        className="tf-input style-1"
                        id="field4"
                        type="password"
                        placeholder=""
                        name="password"
                        tabIndex={2}
                        defaultValue=""
                        aria-required="true"
                      />
                      <label className="tf-field-label fs-15" htmlFor="field4">
                        Current Password
                      </label>
                    </fieldset>
                    <fieldset className="tf-field">
                      <input
                        className="tf-input style-1"
                        id="field4"
                        type="password"
                        placeholder=""
                        name="password"
                        tabIndex={2}
                        defaultValue=""
                        aria-required="true"
                      />
                      <label className="tf-field-label fs-15" htmlFor="field4">
                        New Password
                      </label>
                    </fieldset>
                    <fieldset className="tf-field">
                      <input
                        className="tf-input style-1"
                        id="field4"
                        type="password"
                        placeholder=""
                        name="password"
                        tabIndex={2}
                        defaultValue=""
                        aria-required="true"
                      />
                      <label className="tf-field-label fs-15" htmlFor="field4">
                        Re-Type New Password
                      </label>
                    </fieldset>
                  </form>
                  <a href="#" type="submit" className="tf-btn">
                    Update Password <i className="icon-arrow-top-right"></i>
                  </a>
                </div>
              )}
              {activeTab === 'Social' && (
                <div className="widget-content-inner">
                  <form action="#" className="shop-checkout">
                    <fieldset className="tf-field">
                      <input
                        className="tf-input style-1"
                        id="field4"
                        type="text"
                        placeholder=""
                        name="text"
                        tabIndex={2}
                        defaultValue=""
                        aria-required="true"
                      />
                      <label className="tf-field-label fs-15" htmlFor="field4">
                        Facebook
                      </label>
                    </fieldset>
                    <fieldset className="tf-field">
                      <input
                        className="tf-input style-1"
                        id="field4"
                        type="text"
                        placeholder=""
                        name="text"
                        tabIndex={2}
                        defaultValue=""
                        aria-required="true"
                      />
                      <label className="tf-field-label fs-15" htmlFor="field4">
                        Twitter
                      </label>
                    </fieldset>
                    <fieldset className="tf-field">
                      <input
                        className="tf-input style-1"
                        id="field4"
                        type="text"
                        placeholder=""
                        name="text"
                        tabIndex={2}
                        defaultValue=""
                        aria-required="true"
                      />
                      <label className="tf-field-label fs-15" htmlFor="field4">
                        Linkedin
                      </label>
                    </fieldset>
                    <fieldset className="tf-field">
                      <input
                        className="tf-input style-1"
                        id="field4"
                        type="text"
                        placeholder=""
                        name="text"
                        tabIndex={2}
                        defaultValue=""
                        aria-required="true"
                      />
                      <label className="tf-field-label fs-15" htmlFor="field4">
                        Instagram
                      </label>
                    </fieldset>
                    <fieldset className="tf-field">
                      <input
                        className="tf-input style-1"
                        id="field4"
                        type="text"
                        placeholder=""
                        name="text"
                        tabIndex={2}
                        defaultValue=""
                        aria-required="true"
                      />
                      <label className="tf-field-label fs-15" htmlFor="field4">
                        Website
                      </label>
                    </fieldset>
                    <fieldset className="tf-field">
                      <input
                        className="tf-input style-1"
                        id="field4"
                        type="text"
                        placeholder=""
                        name="text"
                        tabIndex={2}
                        defaultValue=""
                        aria-required="true"
                      />
                      <label className="tf-field-label fs-15" htmlFor="field4">
                        Github
                      </label>
                    </fieldset>
                    <fieldset className="tf-field">
                      <input
                        className="tf-input style-1"
                        id="field4"
                        type="text"
                        placeholder=""
                        name="text"
                        tabIndex={2}
                        defaultValue=""
                        aria-required="true"
                      />
                      <label className="tf-field-label fs-15" htmlFor="field4">
                        Twitter
                      </label>
                    </fieldset>
                  </form>
                  <a href="#" type="submit" className="tf-btn">
                    Update Social <i className="icon-arrow-top-right"></i>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MeSetting
