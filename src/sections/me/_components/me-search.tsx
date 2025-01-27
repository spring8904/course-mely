import React from 'react'

const MeSearch = () => {
  return (
    <div>
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
  )
}

export default MeSearch
