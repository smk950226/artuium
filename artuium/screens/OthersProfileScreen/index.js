import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapStateToProps = (state, ownProps) => {
    const { user : { profile } } = state;
    return{
        profile,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getProfile: () => {
            dispatch(userActions.getProfile())
        },
        followUser: (userId) => {
            return dispatch(userActions.followUser(userId))
        },
        unfollowUser: (userId) => {
            return dispatch(userActions.unfollowUser(userId))
        },
        getReviewList: (userId) => {
            return dispatch(userActions.getReviewList(userId))
        },
        getReviewListMore: (userId, page) => {
            return dispatch(userActions.getReviewListMore(userId, page))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);