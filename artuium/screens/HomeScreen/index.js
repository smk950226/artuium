import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as reviewActions } from '../../redux/modules/review';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapStateToProps = (state, ownProps) => {
    const { review : { initialStatus, newReviews, recommendedReviews, followingReviews }, user : { profile, notificationNew, noticeNew } } = state;
    return {
        initialStatus,
        newReviews,
        recommendedReviews,
        followingReviews,
        profile,
        notificationNew,
        noticeNew
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        initApp: () => {
            dispatch(userActions.getProfile())
            dispatch(reviewActions.initialReview())
        },
        getInitial: (initial) => {
            return dispatch(userActions.getInitial(initial))
        },
        checkNoticeAll: () => {
            return dispatch(userActions.checkNoticeAll())
        },
        checkNotificationAll: () => {
            return dispatch(userActions.checkNotificationAll())
        },
        setPushToken: (pushToken) => {
            return dispatch(userActions.setPushToken(pushToken))
        },
        getProfile: () => {
            dispatch(userActions.getProfile())
        },
        getNoticeNew: (noticeNew) => {
            dispatch(userActions.getNoticeNew(noticeNew))
        },
        getNotificationNew: (notificationNew) => {
            dispatch(userActions.getNotificationNew(notificationNew))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);