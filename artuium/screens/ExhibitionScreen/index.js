import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as exhibitionActions } from '../../redux/modules/exhibition';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapStateToProps = (state, ownProps) => {
    const { exhibition : { initialStatus, newExhibitions, recommendedExhibitions, hotExhibitions, pastExhibitions } } = state;
    return {
        initialStatus,
        newExhibitions,
        recommendedExhibitions,
        hotExhibitions,
        pastExhibitions
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);