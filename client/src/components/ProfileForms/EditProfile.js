import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const EditProfile = ({ profile: { profile, loading }, createProfile, history, getCurrentProfile }) => {
  const [formData, setFormData] = useState({
    nickName: "",
    // lastName: "",
    // location: "",
    // bio: "",
  });


  const [displaySocialInputs, toggleSocialInputs] = useState(false);


  useEffect(() => {
    getCurrentProfile();

    setFormData({
      nickName: loading || !profile.nickName ? "" : profile.nickName,
      // lastName: loading || !profile.lastName ? "" : profile.lastName,
      // location: loading || !profile.location ? "" : profile.location,
      // bio: loading || !profile.bio ? "" : profile.bio,
    });
  }, [loading])


  const { nickName } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };


  return (
    <Fragment>
      <h1 className="large text-primary">Edit Nickname</h1>
      {/* <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile
      </p> */}
      <form className="form" onSubmit={e => onSubmit(e)}>
        {/* Nick Name */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Nickname"
            name="nickName"
            value={nickName}
            onChange={e => onChange(e)}
          /> 
          {/* <small className="form-text">Nick Name</small> */}
        </div>
       

        {/* Last Name */}
        {/* <div className="form-group">
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Last Name</small>
        </div> */}
        
        {/* Location */}
        {/* <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div> */}
        {/* Bio */}
        {/* <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={e => onChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div> */}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};


EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
