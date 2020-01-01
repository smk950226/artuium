import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as exhibitionActions } from '../../redux/modules/exhibition';
import { actionCreators as artworkActions } from '../../redux/modules/artwork';
import { actionCreators as reviewActions } from '../../redux/modules/review';

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
        getExhibitionLikeListMore: (page) => {
            return dispatch(exhibitionActions.getExhibitionLikeList(userId, page))
        },
        getArtworkLikeList: (userId) => {
            return dispatch(artworkActions.getArtworkLikeList(userId))
        },
        getArtworkLikeListMore: (userId, page) => {
            return dispatch(artworkActions.getArtworkLikeList(userId, page))
        },
        getReviewLikeList: (userId) => {
            return dispatch(reviewActions.getReviewLikeList(userId))
        },
        getReviewLikeListMore: (userId, page) => {
            return dispatch(reviewActions.getReviewLikeList(userId, page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);