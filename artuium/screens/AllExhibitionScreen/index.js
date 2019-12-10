import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as exhibitionActions } from '../../redux/modules/exhibition';

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getExhibitionList: (type, filter, period, scale, region) => {
            return dispatch(exhibitionActions.getExhibitionList(type, filter, period, scale, region))
        },
        getExhibitionListMore: (type, filter, period, scale, region, page) => {
            return dispatch(exhibitionActions.getExhibitionListMore(type, filter, period, scale, region, page))
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);