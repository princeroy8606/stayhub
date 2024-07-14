import React from 'react'
import SiderBar from '../../components/owner/siderBar'
import ManagersDetails from '../../components/owner/managers/ManagersDetails'

const Managers = () => {
  return (
    <div className="owner-cont">
        <SiderBar />
        <ManagersDetails/>
    </div>
  )
}

export default Managers