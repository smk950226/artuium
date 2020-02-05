import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as artworkActions } from '../../redux/modules/artwork';
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
        likeArtwork: (artworkId) => {
            return dispatch(artworkActions.likeArtwork(artworkId))
        },
        unlikeArtwork: (artworkId) => {
            return dispatch(artworkActions.unlikeArtwork(artworkId))
        },
        getArtworkReviewList: (artworkId, filter) => {
            return dispatch(artworkActions.getArtworkReviewList(artworkId, filter))
        },
        getArtworkReviewListMore: (artworkId, filter, page) => {
            return dispatch(artworkActions.getArtworkReviewListMore(artworkId, filter, page))
        },
        createArtworkReview: (artworkId, rating, expression, content) => {
            return dispatch(artworkActions.createArtworkReview(artworkId, rating, expression, content))
        },
        getReplyList: (reviewId, filter) => {
            return dispatch(userActions.getReplyList(reviewId, filter))
        },
        getReplyListMore: (reviewId, filter, page) => {
            return dispatch(userActions.getReplyListMore(reviewId, filter, page))
        },
        createReviewReply: (reviewId, content) => {
            return dispatch(userActions.createReviewReply(reviewId, content))
        },
        createReplyReply: (replyId, content) => {
            return dispatch(userActions.createReplyReply(replyId, content))
        },
        updateArtworkReview: (artworkId, reviewId, rating, expression, content) => {
            return dispatch(artworkActions.updateArtworkReview(artworkId, reviewId, rating, expression, content))
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