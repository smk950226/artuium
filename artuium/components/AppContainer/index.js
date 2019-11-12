import { connect } from 'react-redux';
import AppContainer from './presenter';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn } } = state;
    return {
        isLoggedIn
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        logout: () => {
            dispatch(userActions.getLogout());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);