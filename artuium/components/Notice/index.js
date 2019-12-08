import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        checkNotice: (noticeId) => {
            return dispatch(userActions.checkNotice(noticeId))
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);