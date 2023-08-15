import React from 'react'
import Layout from '../../Component/Layout'
import Usermenu from '../../Component/Usermenu'

const Profile = () => {
  return (
    <Layout title={"User Profile"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 p-3 m-3">
            {" "}
            <Usermenu />
          </div>
          <div className="col-md-8 p-3 m-3"><h1>Profile</h1></div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile