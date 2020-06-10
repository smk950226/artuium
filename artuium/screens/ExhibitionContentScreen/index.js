import {connect} from 'react-redux';
import Container from './container';
import {actionCreators as exhibitionActions} from '../../redux/modules/exhibition';
import {actionCreators as userActions} from '../../redux/modules/user';
import {actionCreators as reviewActions} from '../../redux/modules/review';

const mapStateToProps = (state, ownProps) => {
  const {
    review: {blockReviewList, blockUserList, blockReplyList},
    user: {
      profile: {nickname},
    },
  } = state;
  return {
    blockReviewList,
    blockUserList,
    blockReplyList,
    nickname,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    likeExhibition: exhibitionId => {
      return dispatch(exhibitionActions.likeExhibition(exhibitionId));
    },
    unlikeExhibition: exhibitionId => {
      return dispatch(exhibitionActions.unlikeExhibition(exhibitionId));
    },
    getExhibitionReviewList: (exhibitionId, filter) => {
      return dispatch(
        exhibitionActions.getExhibitionReviewList(exhibitionId, filter),
      );
    },
    getExhibitionReviewListMore: (exhibitionId, filter, page) => {
      return dispatch(
        exhibitionActions.getExhibitionReviewListMore(
          exhibitionId,
          filter,
          page,
        ),
      );
    },
    createExhibitionReview: (
      exhibitionId,
      rating,
      expression,
      content,
      title,
    ) => {
      return dispatch(
        exhibitionActions.createExhibitionReview(
          exhibitionId,
          rating,
          expression,
          content,
          title,
        ),
      );
    },
    getReplyList: (reviewId, filter) => {
      return dispatch(userActions.getReplyList(reviewId, filter));
    },
    getReplyListMore: (reviewId, filter, page) => {
      return dispatch(userActions.getReplyListMore(reviewId, filter, page));
    },
    createReviewReply: (reviewId, content) => {
      return dispatch(userActions.createReviewReply(reviewId, content));
    },
    createReplyReply: (replyId, content) => {
      return dispatch(userActions.createReplyReply(replyId, content));
    },
    updateExhibitionReview: (
      exhibitionId,
      reviewId,
      rating,
      expression,
      content,
      title,
    ) => {
      return dispatch(
        exhibitionActions.updateExhibitionReview(
          exhibitionId,
          reviewId,
          rating,
          expression,
          content,
          title,
        ),
      );
    },
    addBlockReview: reviewId => {
      dispatch(reviewActions.addBlockReview(reviewId));
    },
    addBlockUser: userId => {
      dispatch(reviewActions.addBlockUser(userId));
    },
    addBlockReply: replyId => {
      dispatch(reviewActions.addBlockReply(replyId));
    },
    updateReviewReply: (replyId, content) => {
      return dispatch(userActions.updateReviewReply(replyId, content));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
