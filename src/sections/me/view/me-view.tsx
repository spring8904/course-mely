'use client'

import { useState } from 'react'

import MeBanner from '../_components/me-banner'
import MeSideBar from '../_components/me-sidebar'

const MeView = () => {
  const [content, setContent] = useState<React.ReactNode>(null)
  return (
    <div>
      <MeBanner />
      <div className="mt-10 pt-0">
        <div className="page-inner tf-spacing-">
          <div className="tf-container">
            <div className="row">
              <div className="col-xl-3 col-lg-12">
                <MeSideBar
                  onSelect={(component) => {
                    setContent(component)
                  }}
                />
              </div>
              <div className="col-xl-9 col-lg-12">
                <div>{content || <div>lỗi rùi hehe</div>}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MeView
