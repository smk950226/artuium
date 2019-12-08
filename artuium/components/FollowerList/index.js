import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        followerList: (userId) => {
            return dispatch(userActions.followerList(userId))
        },
        followerListMore: (userId, page) => {
            return dispatch(userActions.followerListMore(userId, page))
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);