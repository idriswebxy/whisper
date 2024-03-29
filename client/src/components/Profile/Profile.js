import React, { Fragment, useEffect } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import { getProfileById } from "../../actions/profile";
import ProfileAbout from "./ProfileAbout";


const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {

  useEffect(() => {
    getProfileById(match.params.id)
  },[getProfileById, match.params.id])


  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profiles
          </Link>
          <ProfileAbout profile={profile} />
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Nickname
              </Link>
            )}
            
        </Fragment>
      )}
    </Fragment>
  )
}


Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})


export default connect(mapStateToProps, { getProfileById })(Profile);
