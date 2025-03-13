'use client'

import PassWordView from '@/sections/me/_components/password/_components/password'

const MePassWord = () => {
  return (
    <div>
      <div className="section-setting-right">
        <div className="box">
          <div className="widget-tabs style-small">
            <ul className="widget-menu-tab overflow-x-auto">
              <li className="mb-4 text-2xl font-semibold">Mật khẩu</li>
            </ul>
            <div className="widget-content-tab">
              <PassWordView />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MePassWord
