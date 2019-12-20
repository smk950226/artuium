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
        getArtworkLikeList: () => {
            return dispatch(artworkActions.getArtworkLikeList())
        },
        getArtworkLikeListMore: (page) => {
            return dispatch(artworkActions.getArtworkLikeListMore(page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);