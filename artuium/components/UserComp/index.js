import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        followUser: (userId) => {
            return dispatch(userActions.followUser(userId))
        },
        unfollowUser: (userId) => {
            return dispatch(userActions.unfollowUser(userId))
        },
        reportUser: (userId) => {
            return dispatch(userActions.reportUser(userId))
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);