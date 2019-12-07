import { FETCH_URL } from '../../config/urls';

const SET_INITIAL_REVIEW = 'SET_INITIAL_REVIEW';

function setInitialReview(initial){
    return {
        type: SET_INITIAL_REVIEW,
        initial
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

const initialState = {
    
};

function reducer(state = initialState, action){
    switch(action.type){
        case SET_INITIAL_REVIEW:
            return applySetInitialReview(state, action);
        default:
           return state;
    }
}

function applySetInitialReview(state, action){
    const { initial } = action;
    return {
        ...state,
        initialStatus: initial.status,
        newReviews: initial.new_reviews,
        recommendedReviews: initial.recommended_reviews,
        followingReviews: initial.following_reviews,
    };
};

const actionCreators = {
    initialReview
}

export { actionCreators }

export default reducer;   