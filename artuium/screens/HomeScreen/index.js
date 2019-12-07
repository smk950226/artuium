import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as reviewActions } from '../../redux/modules/review';

const mapStateToProps = (state, ownProps) => {
    const { review : { initialStatus, newReviews, recommendedReviews, followingReviews } } = state;
    return {
        initialStatus,
        newReviews,
        recommendedReviews,
        followingReviews
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        initialReview: () => {
            dispatch(reviewActions.initialReview())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);