import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapStateToProps = (state, ownProps) => {
    const { user : { profile, token } } = state;
    return {
        profile,
        token
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        signUp: (username, password, nickname, profile_image) => {
            return dispatch(userActions.signUp(username, password, nickname, profile_image))
        },
        login: (username, password) => {
            return dispatch(userActions.login(username, password))
        },
        getSaveToken: (token) => {
            return dispatch(userActions.getSaveToken(token))
        },
        getProfileByToken: (token) => {
            dispatch(userActions.getProfileByToken(token))
        },
        checkNickname: (nickname) => {
            return dispatch(userActions.checkNickname(nickname))
        },
        checkEmail: (email) => {
            return dispatch(userActions.checkEmail(email))
        },
        kakaoLogin: (accessToken) => {
            return dispatch(userActions.kakaoLogin(accessToken))
        },
        logout: () => {
            dispatch(userActions.getLogout());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);