import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../redux/modules/user';
import { actionCreators as reviewActions } from '../../redux/modules/review';

const mapStateToProps = (state, ownProps) => {
    const { review : { blockUserList, blockReplyList } } = state;
    return{
        blockUserList,
        blockReplyList
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getRepliesList: (replyId, page) => {
            return dispatch(userActions.getRepliesList(replyId, page))
        },
        followUser: (userId) => {
            return dispatch(userActions.followUser(userId))
        },
        unfollowUser: (userId) => {
            return dispatch(userActions.unfollowUser(userId))
        },
        initialReview: () => {
            dispatch(reviewActions.initialReview())
        },
        reportUser: (userId) => {
            return dispatch(userActions.reportUser(userId))
        },
        blockUser: (userId) => {
            return dispatch(userActions.blockUser(userId))
        },
        reportReply: (replyId) => {
            return dispatch(reviewActions.reportReply(replyId))
        },
        blockReply: (replyId) => {
            return dispatch(reviewActions.blockReply(replyId))
        },
        deleteReviewReply: (replyId) => {
            return dispatch(userActions.deleteReviewReply(replyId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);