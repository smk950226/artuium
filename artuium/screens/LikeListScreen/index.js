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
        getExhibitionLikeList: () => {
            return dispatch(exhibitionActions.getExhibitionLikeList())
        },
        getExhibitionLikeListMore: (page) => {
            return dispatch(exhibitionActions.getExhibitionLikeList(page))
        },
        getArtworkLikeList: () => {
            return dispatch(artworkActions.getArtworkLikeList())
        },
        getArtworkLikeListMore: (page) => {
            return dispatch(artworkActions.getArtworkLikeList(page))
        },
        getReviewLikeList: () => {
            return dispatch(reviewActions.getReviewLikeList())
        },
        getReviewLikeListMore: (page) => {
            return dispatch(reviewActions.getReviewLikeList(page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);