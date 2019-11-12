import { FETCH_URL } from '../../config/urls';
import { Notifications } from 'expo';

const LOGOUT = 'LOGOUT';
const SAVE_TOKEN = 'SAVE_TOKEN';
const SET_PROFILE = 'SET_PROFILE';

function logout(){
    return {
        type: LOGOUT
    }
};

function saveToken(token) {
    return {
        type: SAVE_TOKEN,
        token
    }
}

function setProfile(profile){
    return {
        type: SET_PROFILE,
        profile
    }
}

function getLogout(){
    return (dispatch) => {
        dispatch(logout());
    }
}

function getSaveToken(token){
    return (dispatch) => {
        dispatch(saveToken(token))
    }
}

function getProfile(){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        fetch(`${FETCH_URL}/api/users/profile/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(getLogout())
            }
            else{
                return response.json()
            }
        })
        .then(json => dispatch(setProfile(json)))
    }
}

const initialState = {
    isLoggedIn: false,
    token: null,
};

function reducer(state = initialState, action){
    switch(action.type){
        case LOGOUT:
            return applyLogout(state, action);
        case SAVE_TOKEN:
            return applySaveToken(state, action);
        case SET_PROFILE:
            return applySetProfile(state, action);
        default:
           return state;
    }
}

function applyLogout(state, action){
    return {
        isLoggedIn: false
    };
};

function applySaveToken(state, action){
    const { token } = action;
    return {
        ...state,
        isLoggedIn: true,
        token
    };
}

function applySetProfile(state, action){
    const { profile } = action;
    return {
        ...state,
        profile
    }
}

const actionCreators = {
    getLogout,
    getSaveToken,
    getProfile
}

export { actionCreators }

export default reducer;   