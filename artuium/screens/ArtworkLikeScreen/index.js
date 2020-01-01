import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as artworkActions } from '../../redux/modules/artwork';

const mapStateToProps = (state, ownProps) => {
    const { user : { profile } } = state;
    return {
        profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getArtworkLikeList: (userId) => {
            return dispatch(artworkActions.getArtworkLikeList(userId))
        },
        getArtworkLikeListMore: (userId, page) => {
            return dispatch(artworkActions.getArtworkLikeListMore(userId, page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);