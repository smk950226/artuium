import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as exhibitionActions } from '../../redux/modules/exhibition';

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        likeExhibition: (exhibitionId) => {
            return dispatch(exhibitionActions.likeExhibition(exhibitionId))
        },
        unlikeExhibition: (exhibitionId) => {
            return dispatch(exhibitionActions.unlikeExhibition(exhibitionId))
        }
    }
}
export default connect(null, mapDispatchToProps)(Container);