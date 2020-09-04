import React from 'react';
import UserAreaHOC from '../../hoc/userAreaHoc';
import EmailPass from './emailPass';
import Stats from './stats';

const Profile = (props) =>{
    return(
        <UserAreaHOC>
          <EmailPass {...props}/>
          <hr/>
          <Stats {...props}/>
        </UserAreaHOC>
    )
}

export default Profile;