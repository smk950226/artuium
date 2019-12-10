import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as reviewActions } from '../../redux/modules/review';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getReviewList: (type, filter) => {
            return dispatch(reviewActions.getReviewList(type, filter))
        },
        getReviewListMore: (type, filter, page) => {
            return dispatch(reviewActions.getReviewListMore(type, filter, page))
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);