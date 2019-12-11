import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapStateToProps = (state, ownProps) => {
    const { user : { profile } } = state;
    return {
        profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        login: (username, password) => {
            return dispatch(userActions.login(username, password))
        },
        getSaveToken: (token) => {
            return dispatch(userActions.getSaveToken(token))
        },
        getProfileByToken: (token) => {
            dispatch(userActions.getProfileByToken(token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);