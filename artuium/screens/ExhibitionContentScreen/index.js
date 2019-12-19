import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as exhibitionActions } from '../../redux/modules/exhibition';

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        likeExhibition: (exhibitionId) => {
            return dispatch(exhibitionActions.likeExhibition(exhibitionId))
        },
        unlikeExhibition: (exhibitionId) => {
            return dispatch(exhibitionActions.unlikeExhibition(exhibitionId))
        },
        getExhibitionReviewList: (exhibitionId) => {
            return dispatch(exhibitionActions.getExhibitionReviewList(exhibitionId))
        },
        getExhibitionReviewListMore: (exhibitionId, page) => {
            return dispatch(exhibitionActions.getExhibitionReviewListMore(exhibitionId, page))
        },
        createExhibitionReview: (exhibitionId, rating, expression, content) => {
            return dispatch(exhibitionActions.createExhibitionReview(exhibitionId, rating, expression, content))
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);