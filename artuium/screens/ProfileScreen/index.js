import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapStateToProps = (state, ownProps) => {
    const { user : { profile } } = state;
    return{
        profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getProfile: () => {
            dispatch(userActions.getProfile())
        },
        checkNoticeAll: () => {
            return dispatch(userActions.checkNoticeAll())
        },
        getReviewList: () => {
            return dispatch(userActions.getReviewList())
        },
        getReviewListMore: (page) => {
            return dispatch(userActions.getReviewListMore(page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);