import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as exhibitionActions } from '../../redux/modules/exhibition';

const mapStateToProps = (state, ownProps) => {
    const { user : { profile } } = state;
    return {
        profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getExhibitionLikeList: (userId) => {
            return dispatch(exhibitionActions.getExhibitionLikeList(userId))
        },
        getExhibitionLikeListMore: (userId, page) => {
            return dispatch(exhibitionActions.getExhibitionLikeListMore(userId, page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);