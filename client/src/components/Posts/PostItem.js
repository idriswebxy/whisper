import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, nickName, avatar, user, likes, comments, date },
  showActions
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <i className="fas fa-user fa-2x" />
      <h4>{nickName}</h4>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format="MM/DD/YYYY">{date}</Moment>
      </p>

      {showActions && (
        <Fragment>
          <button
            onClick={() => addLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-up" />{" "}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>

          <button
            onClick={() => removeLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-down" />{" "}
            {/* <div>{likes.length > 0 && <span>{likes.length}</span>}</div> */}
          </button>

          <Link to={`/posts/${_id}`} class="btn btn-primary">
            Reply{" "}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  profile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);
