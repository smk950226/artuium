import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as exhibitionActions } from '../../redux/modules/exhibition';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapStateToProps = (state, ownProps) => {
    const { exhibition : { initialStatus, newExhibitions, recommendedExhibitions, hotExhibitions, pastExhibitions }, user : { notificationNew, noticeNew } } = state;
    return {
        initialStatus,
        newExhibitions,
        recommendedExhibitions,
        hotExhibitions,
        pastExhibitions,
        notificationNew,
        noticeNew
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        initialExhibition: () => {
            dispatch(exhibitionActions.initialExhibition())
        },
        checkNoticeAll: () => {
            return dispatch(userActions.checkNoticeAll())
        },
        checkNotificationAll: () => {
            return dispatch(userActions.checkNotificationAll())
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