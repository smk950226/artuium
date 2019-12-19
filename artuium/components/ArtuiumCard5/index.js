import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../redux/modules/user';
import { actionCreators as reviewActions } from '../../redux/modules/review';

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        followUser: (userId) => {
            return dispatch(userActions.followUser(userId))
        },
        unfollowUser: (userId) => {
            return dispatch(userActions.unfollowUser(userId))
        },
        likeReview: (reviewId) => {
            return dispatch(reviewActions.likeReview(reviewId))
        },
        unlikeReview: (reviewId) => {
            return dispatch(reviewActions.unlikeReview(reviewId))
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);