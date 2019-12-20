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
        getExhibitionLikeList: () => {
            return dispatch(exhibitionActions.getExhibitionLikeList())
        },
        getExhibitionLikeListMore: (page) => {
            return dispatch(exhibitionActions.getExhibitionLikeListMore(page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);