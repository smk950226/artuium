import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as reviewActions } from '../../redux/modules/review';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapStateToProps = (state, ownProps) => {
    const { review : { initialStatus, newReviews, recommendedReviews, followingReviews }, user : { initial } } = state;
    return {
        initialStatus,
        newReviews,
        recommendedReviews,
        followingReviews,
        initial
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        initialReview: () => {
            dispatch(reviewActions.initialReview())
        },
        getInitial: (initial) => {
            dispatch(userActions.getInitial(initial))
        },
        checkNoticeAll: () => {
            return dispatch(userActions.checkNoticeAll())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);