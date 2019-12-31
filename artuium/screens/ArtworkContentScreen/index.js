import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as artworkActions } from '../../redux/modules/artwork';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        likeArtwork: (artworkId) => {
            return dispatch(artworkActions.likeArtwork(artworkId))
        },
        unlikeArtwork: (artworkId) => {
            return dispatch(artworkActions.unlikeArtwork(artworkId))
        },
        getArtworkReviewList: (artworkId) => {
            return dispatch(artworkActions.getArtworkReviewList(artworkId))
        },
        getArtworkReviewListMore: (artworkId, page) => {
            return dispatch(artworkActions.getArtworkReviewListMore(artworkId, page))
        },
        createArtworkReview: (artworkId, rating, expression, content) => {
            return dispatch(artworkActions.createArtworkReview(artworkId, rating, expression, content))
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