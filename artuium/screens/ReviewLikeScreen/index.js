import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as reviewActions } from '../../redux/modules/review';

const mapStateToProps = (state, ownProps) => {
    const { user : { profile } } = state;
    return {
        profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getReviewLikeList: () => {
            return dispatch(reviewActions.getReviewLikeList())
        },
        getReviewLikeListMore: (page) => {
            return dispatch(reviewActions.getReviewLikeListMore(page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);