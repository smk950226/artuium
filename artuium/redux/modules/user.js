import { FETCH_URL } from '../../config/urls';

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

function signUp(username, password, name, agreeTerms, code, birth, gender, phoneNumber){
    return (dispatch) => {
        return fetch(`${FETCH_URL}/api/center/check/?code=${code}`)
        .then(response => {
            if(response.status === 200){
                return fetch(`${FETCH_URL}/rest-auth/registration/`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        email: username,
                        password1: password,
                        password2: password,
                        name,
                        agreeTerms, 
                        code, 
                        birth, 
                        gender, 
                        phoneNumber
                    })
                 })
                 .then(response => response.json())
                 .then(json => {
                     if(json.token){
                         return {
                             token: json.token
                         }
                     }
                     else{
                         return false
                     }
                 })
                 .catch(err => console.log(err));
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function login(username, password){
    return (dispatch) => {
        return fetch(`${FETCH_URL}/rest-auth/login/`, {
            method: 'POST',
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: 'smk950226',
                password: 'TMDALS236',
            })
        })
        .then(response => {
            return response.json()
        })
        .then((json) => {
            if(json.token){
                return {
                    token: json.token
                }
            }
            else{
                return false
            }
        })
        .catch(err => console.log(err));
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
    getProfile,
    signUp,
    login
}

export { actionCreators }

export default reducer;   