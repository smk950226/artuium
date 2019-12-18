import { FETCH_URL } from '../../config/urls';
import uuidv1 from 'uuid'

const LOGOUT = 'LOGOUT';
const SAVE_TOKEN = 'SAVE_TOKEN';
const SET_PROFILE = 'SET_PROFILE';
const SET_INITIAL = 'SET_INITIAL';

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

function setInitial(initial){
    return {
        type: SET_INITIAL,
        initial
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

function getInitial(initial){
    return (dispatch) => {
        dispatch(setInitial(initial))
    }
}

function signUp(username, password, nickname, profile_image){
    return (dispatch) => {
        let formData = new FormData();
        if(profile_image){
            const temp = profile_image.type.split('/')
            const ext = temp[temp.length - 1]
            formData.append('profile_image',{
                uri: profile_image.uri,
                type: profile_image.type,
                name: `${uuidv1()}.` + ext
            })
            formData.append('username', username)
            formData.append('email', username)
            formData.append('password1', password)
            formData.append('password2', password)
            formData.append('nickname', nickname)
        }
        return fetch(`${FETCH_URL}/rest-auth/registration/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: formData
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            if(json.token){
                dispatch(saveToken(json.token))
                return true
            }
            else{
                return false
            }
        })
        .catch(err => console.log(err));
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
                username,
                password
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

function checkNickname(nickname){
    return (dispatch) => {
        return fetch(`${FETCH_URL}/api/users/check/nickname/?nickname=${nickname}`,{
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(json => json)
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
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => dispatch(setProfile(json)))
    }
}

function getProfileByToken(token){
    return (dispatch) => {
        fetch(`${FETCH_URL}/api/users/profile/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(getLogout())
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => dispatch(setProfile(json)))
    }
}

function followUser(userId){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/users/follow/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                userId
            })
        })
        .then(response => {
            if(response.status === 401){
                dispatch(getLogout())
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function unfollowUser(userId){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/users/follow/`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                userId
            })
        })
        .then(response => {
            if(response.status === 401){
                dispatch(getLogout())
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function getNotice(){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/notice/?page=1`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(getLogout())
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function getNoticeMore(page){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/notice/?page=${page}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(getLogout())
                return false
            }
            else if(response.status === 404){
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function checkNoticeAll(){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/notice/check/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(getLogout())
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function checkNotice(noticeId){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/notice/check/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                noticeId
            })
        })
        .then(response => {
            if(response.status === 401){
                dispatch(getLogout())
                return false
            }
            else if(response.status === 200){
                return true
            }
            else if(response.status === 201){
                return 'clear'
            }
            else{
                return false
            }
        })
        .then(json => json)
    }
}

function followerList(userId){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/follower/list/?userId=${userId}&page=1`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(getLogout())
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function followerListMore(userId, page){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/follower/list/?userId=${userId}&page=${page}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(getLogout())
                return false
            }
            else if(response.status === 404){
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function followingList(userId){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/following/list/?userId=${userId}&page=1`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(getLogout())
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function followingListMore(userId, page){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/following/list/?userId=${userId}&page=${page}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(getLogout())
                return false
            }
            else if(response.status === 404){
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function search(q){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/users/search/?q=${q}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(getLogout())
                return false
            }
            else if(response.status === 203){
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function recommended(){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/users/recommended/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(getLogout())
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function getReviewList(){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/users/list/review/?page=1`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(getLogout())
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function getReviewListMore(page){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/users/list/review/?page=${page}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(getLogout())
                return false
            }
            else if(response.status === 404){
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function changeNickname(nickname){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        fetch(`${FETCH_URL}/api/users/change/nickname/`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                nickname,
            })
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout());
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => dispatch(setProfile(json)))
    }
}

function changeProfileImg(profileImg){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        let formData = new FormData();
        if(profileImg){
            const temp = profileImg.type.split('/')
            const ext = temp[temp.length - 1]
            formData.append('profileImg',{
                uri: profileImg.uri,
                type: profileImg.type,
                name: `${uuidv1()}.` + ext
            })
        }
        fetch(`${FETCH_URL}/api/users/change/profileimg/`, {
            method: 'PUT',
            headers: {
                "Authorization": `JWT ${token}`
            },
            body: formData
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout());
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => dispatch(setProfile(json)))
    }
}

function changeBackgroundImg(backgroundImg){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        let formData = new FormData();
        if(backgroundImg){
            const temp = backgroundImg.type.split('/')
            const ext = temp[temp.length - 1]
            formData.append('backgroundImg',{
                uri: backgroundImg.uri,
                type: backgroundImg.type,
                name: `${uuidv1()}.` + ext
            })
        }
        fetch(`${FETCH_URL}/api/users/change/backgroundimg/`, {
            method: 'PUT',
            headers: {
                "Authorization": `JWT ${token}`
            },
            body: formData
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout());
                return false
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
    initial: true
};

function reducer(state = initialState, action){
    switch(action.type){
        case LOGOUT:
            return applyLogout(state, action);
        case SAVE_TOKEN:
            return applySaveToken(state, action);
        case SET_PROFILE:
            return applySetProfile(state, action);
        case SET_INITIAL:
            return applySetInitial(state, action);
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

function applySetInitial(state, action){
    const { initial } = action;
    return {
        ...state,
        initial
    }
}

const actionCreators = {
    getLogout,
    getSaveToken,
    getProfile,
    getProfileByToken,
    signUp,
    login,
    checkNickname,
    followUser,
    unfollowUser,
    getInitial,
    getNotice,
    getNoticeMore,
    checkNotice,
    checkNoticeAll,
    followerList,
    followerListMore,
    followingList,
    followingListMore,
    search,
    recommended,
    getReviewList,
    getReviewListMore,
    changeNickname,
    changeProfileImg,
    changeBackgroundImg,
}

export { actionCreators }

export default reducer;   