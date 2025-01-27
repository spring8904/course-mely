import React from 'react'

const MeSearch = () => {
  return (
    <form action="#" className="form-search">
      <fieldset>
        <input
          className=""
          type="text"
          placeholder="Search for anything"
          name="text"
          tabIndex={2}
          defaultValue=""
          aria-required="true"
        />
      </fieldset>
      <div className="button-submit">
        <button className="" type="submit">
          <i className="icon-search fs-20" />
        </button>
      </div>
    </form>
  )
}

export default MeSearch
