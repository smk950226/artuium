import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapStateToProps = (state, ownProps) => {
    const { user : { profile } } = state;
    return{
        profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getProfile: () => {
            dispatch(userActions.getProfile())
        },
        checkNickname: (nickname) => {
            return dispatch(userActions.checkNickname(nickname))
        },
        changeNickname: (nickname) => {
            dispatch(userActions.changeNickname(nickname))
        },
        changeProfileImg: (profileImg) => {
            dispatch(userActions.changeProfileImg(profileImg))
        },
        changeBackgroundImg: (backgroundImg) => {
            dispatch(userActions.changeBackgroundImg(backgroundImg))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);