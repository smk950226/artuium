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
        initialReview: () => {
            dispatch(reviewActions.initialReview())
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);