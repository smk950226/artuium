import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as exhibitionActions } from '../../redux/modules/exhibition';
import { actionCreators as userActions } from '../../redux/modules/user';

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
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);