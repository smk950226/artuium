import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getNotice: () => {
            return dispatch(userActions.getNotice())
        },
        getNoticeMore: (page) => {
            return dispatch(userActions.getNoticeMore(page))
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);