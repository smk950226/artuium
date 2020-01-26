import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as exhibitionActions } from '../../redux/modules/exhibition';
import { actionCreators as userActions } from '../../redux/modules/user';
import { actionCreators as reviewActions } from '../../redux/modules/review';

const mapStateToProps = (state, ownProps) => {
    const { review : { blockReviewList, blockUserList, blockReplyList } } = state;
    return{
        blockReviewList,
        blockUserList,
        blockReplyList
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        likeExhibition: (exhibitionId) => {
            return dispatch(exhibitionActions.likeExhibition(exhibitionId))
        },
        unlikeExhibition: (exhibitionId) => {
            return dispatch(exhibitionActions.unlikeExhibition(exhibitionId))
        },
        getExhibitionReviewList: (exhibitionId) => {
            return dispatch(exhibitionActions.getExhibitionReviewList(exhibitionId))
        },
        getExhibitionReviewListMore: (exhibitionId, page) => {
            return dispatch(exhibitionActions.getExhibitionReviewListMore(exhibitionId, page))
        },
        createExhibitionReview: (exhibitionId, rating, expression, content) => {
            return dispatch(exhibitionActions.createExhibitionReview(exhibitionId, rating, expression, content))
        },
        getReplyList: (reviewId) => {
            return dispatch(userActions.getReplyList(reviewId))
        },
        getReplyListMore: (reviewId, page) => {
            return dispatch(userActions.getReplyListMore(reviewId, page))
        },
        createReviewReply: (reviewId, content) => {
            return dispatch(userActions.createReviewReply(reviewId, content))
        },
        createReplyReply: (replyId, content) => {
            return dispatch(userActions.createReplyReply(replyId, content))
        },
        updateExhibitionReview: (exhibitionId, reviewId, rating, expression, content) => {
            return dispatch(exhibitionActions.updateExhibitionReview(exhibitionId, reviewId, rating, expression, content))
        },
        addBlockReview: (reviewId) => {
            dispatch(reviewActions.addBlockReview(reviewId))
        },
        addBlockUser: (userId) => {
            dispatch(reviewActions.addBlockUser(userId))
        },
        addBlockReply: (replyId) => {
            dispatch(reviewActions.addBlockReply(replyId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);