import React from 'react'

const SearchAndSort = () => {
  return (
    <div>
      <div className="row">
        <div className="pd-40 flex items-center">
          <div className="header-search wow fadeInUp grow">
            <form action="#" className="form-search">
              <fieldset>
                <input
                  className=""
                  type="text"
                  placeholder="Search for anything"
                  name="text"
                  tabIndex={2}
                  value=""
                  aria-required="true"
                  required
                />
              </fieldset>
              <div className="button-submit">
                <button className="" type="submit">
                  <i className="icon-search fs-20"></i>
                </button>
              </div>
            </form>
          </div>
          <div className="sort-by-wrap">
            <div className="sort-wrap">
              <p className="text text-2 wow fadeInUp" data-wow-delay="0.1s">
                Sort by
              </p>
              <div
                className="nice-select default wow fadeInUp"
                data-wow-delay="0.1s"
                tabIndex={0}
              >
                <span className="current text text-1">Date Created</span>
                <ul className="list">
                  <li data-value className="option selected text text-1">
                    Date Created
                  </li>
                  <li data-value="For Ren" className="option text text-1">
                    Oldest
                  </li>
                  <li data-value="Sold" className="option text text-1">
                    3 days
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchAndSort
