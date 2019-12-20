import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as artworkActions } from '../../redux/modules/artwork';

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        likeArtwork: (artworkId) => {
            return dispatch(artworkActions.likeArtwork(artworkId))
        },
        unlikeArtwork: (artworkId) => {
            return dispatch(artworkActions.unlikeArtwork(artworkId))
        },
        getArtworkReviewList: (artworkId) => {
            return dispatch(artworkActions.getArtworkReviewList(artworkId))
        },
        getArtworkReviewListMore: (artworkId, page) => {
            return dispatch(artworkActions.getArtworkReviewListMore(artworkId, page))
        },
        createArtworkReview: (artworkId, rating, expression, content) => {
            return dispatch(artworkActions.createArtworkReview(artworkId, rating, expression, content))
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);