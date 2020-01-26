import { FETCH_URL } from '../../config/urls';

const SET_INITIAL_REVIEW = 'SET_INITIAL_REVIEW';
const SET_RECOMMENDED_REVIEW = 'SET_RECOMMENDED_REVIEW';
const SET_NEW_REVIEW = 'SET_NEW_REVIEW';
const SET_FOLLOWING_REVIEW = 'SET_FOLLOWING_REVIEW';

function setInitialReview(initial){
    return {
        type: SET_INITIAL_REVIEW,
        initial
    }
};

function setRecommendedReview(review){
    return {
        type: SET_RECOMMENDED_REVIEW,
        review
    }
};

function setNewReview(review){
    return {
        type: SET_NEW_REVIEW,
        review
    }
};

function setFollowingReview(review){
    return {
        type: SET_FOLLOWING_REVIEW,
        review
    }
};

function initialReview(){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        fetch(`${FETCH_URL}/api/statics/init/`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => response.json())
        .then(json => dispatch(setInitialReview(json)))
    }
}

function getRecommendedReview(){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        fetch(`${FETCH_URL}/api/statics/review/recommended/`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => response.json())
        .then(json => dispatch(setRecommendedReview(json)))
    }
}

function getNewReview(){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        fetch(`${FETCH_URL}/api/statics/review/new/`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => response.json())
        .then(json => dispatch(setNewReview(json)))
    }
}

function getFollowingReview(){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        fetch(`${FETCH_URL}/api/statics/review/following/`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => response.json())
        .then(json => dispatch(setFollowingReview(json)))
    }
}

function getReviewList(type, filter){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/review/?page=1&type=${type}&filter=${filter}`, {
            headers: {
                'Content-Type': 'application/json',
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

function getReviewListMore(type, filter, page){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/review/?page=${page}&type=${type}&filter=${filter}`, {
            headers: {
                'Content-Type': 'application/json',
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

function likeReview(reviewId){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/like/review/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                reviewId
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

function unlikeReview(reviewId){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/like/review/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                reviewId
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

function getReviewLikeList(userId){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/like/review/${userId}/?page=1`, {
            headers: {
                'Content-Type': 'application/json',
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

function getReviewLikeListMore(userId, page){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/like/review/${userId}/?page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
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


function reportReview(reviewId){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/report/review/?reviewId=${reviewId}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if((response.status === 401) || (response.status === 403)){
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

const initialState = {
    banners: [],
    newReviews: [],
    recommendedReviews: [],
    followingReviews: []
};

function reducer(state = initialState, action){
    switch(action.type){
        case SET_INITIAL_REVIEW:
            return applySetInitialReview(state, action);
        case SET_RECOMMENDED_REVIEW:
            return applySetRecommendedReview(state, action);
        case SET_NEW_REVIEW:
            return applySetNewReview(state, action);
        case SET_FOLLOWING_REVIEW:
            return applySetFollowingReview(state, action);
        default:
           return state;
    }
}

function applySetInitialReview(state, action){
    const { initial } = action;
    return {
        ...state,
        banners: initial.banners,
        initialStatus: initial.status,
        newReviews: initial.new_reviews,
        recommendedReviews: initial.recommended_reviews,
        followingReviews: initial.following_reviews,
    };
};

function applySetRecommendedReview(state, action){
    const { review } = action;
    return {
        ...state,
        recommendedReviews: review.recommended_reviews,
    };
};

function applySetNewReview(state, action){
    const { review } = action;
    return {
        ...state,
        newReviews: review.new_reviews,
    };
};

function applySetFollowingReview(state, action){
    const { review } = action;
    return {
        ...state,
        followingReviews: review.following_reviews,
    };
};

const actionCreators = {
    initialReview,
    getReviewList,
    getReviewListMore,
    likeReview,
    unlikeReview,
    getReviewLikeList,
    getReviewLikeListMore,
    reportReview,
    getRecommendedReview,
    getNewReview,
    getFollowingReview
}

export { actionCreators }

export default reducer;   