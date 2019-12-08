import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        followingList: (userId) => {
            return dispatch(userActions.followingList(userId))
        },
        followingListMore: (userId, page) => {
            return dispatch(userActions.followingListMore(userId, page))
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);