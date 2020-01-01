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
        getReviewLikeList: (userId) => {
            return dispatch(reviewActions.getReviewLikeList(userId))
        },
        getReviewLikeListMore: (userId, page) => {
            return dispatch(reviewActions.getReviewLikeListMore(userId, page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);