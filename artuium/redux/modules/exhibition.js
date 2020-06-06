import {FETCH_URL} from '../../config/urls';

const SET_INITIAL_EXHIBITION = 'SET_INITIAL_EXHIBITION';
const SET_RECOMMENDED_EXHIBITION = 'SET_RECOMMENDED_EXHIBITION';

function setInitialExhibition(initial) {
  return {
    type: SET_INITIAL_EXHIBITION,
    initial,
  };
}

function setRecommendedExhibition(initial) {
  return {
    type: SET_RECOMMENDED_EXHIBITION,
    initial,
  };
}

function initialExhibition() {
  return (dispatch, getState) => {
    const {
      user: {token},
    } = getState();
    fetch(`${FETCH_URL}/api/exhibition/init/?v=v2`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })
      .then(response => response.json())
      .then(json => dispatch(setInitialExhibition(json)));
  };
}

function getRecommendedExhibition() {
  return (dispatch, getState) => {
    const {
      user: {token},
    } = getState();
    fetch(`${FETCH_URL}/api/exhibition/init/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })
      .then(response => response.json())
      .then(json => dispatch(setRecommendedExhibition(json)));
  };
}

function likeExhibition(exhibitionId) {
  return (dispatch, getState) => {
    const {
      user: {token},
    } = getState();
    return fetch(`${FETCH_URL}/api/statics/like/exhibition/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        exhibitionId,
      }),
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(getLogout());
          return false;
        } else {
          return response.json();
        }
      })
      .then(json => json);
  };
}

function unlikeExhibition(exhibitionId) {
  return (dispatch, getState) => {
    const {
      user: {token},
    } = getState();
    return fetch(`${FETCH_URL}/api/statics/like/exhibition/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        exhibitionId,
      }),
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(getLogout());
          return false;
        } else {
          return response.json();
        }
      })
      .then(json => json);
  };
}

function getExhibitionList(type, filter, period, scale, region) {
  return (dispatch, getState) => {
    const {
      user: {token},
    } = getState();
    return fetch(
      `${FETCH_URL}/api/exhibition/exhibition/?page=1&type=${type}&filter=${filter}${
        period ? `&period=${period}` : ``
      }${scale ? `&scale=${scale}` : ``}${region ? `&region=${region}` : ``}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
      },
    )
      .then(response => {
        if (response.status === 401) {
          dispatch(getLogout());
          return false;
        } else {
          return response.json();
        }
      })
      .then(json => json);
  };
}

function getExhibitionListMore(type, filter, period, scale, region, page) {
  return (dispatch, getState) => {
    const {
      user: {token},
    } = getState();
    return fetch(
      `${FETCH_URL}/api/exhibition/exhibition/?page=${page}&type=${type}&filter=${filter}${
        period ? `&period=${period}` : ``
      }${scale ? `&scale=${scale}` : ``}${region ? `&region=${region}` : ``}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
      },
    )
      .then(response => {
        if (response.status === 401) {
          dispatch(getLogout());
          return false;
        } else if (response.status === 404) {
          return false;
        } else {
          return response.json();
        }
      })
      .then(json => json);
  };
}

function getExhibitionDetailByArtwork(artworkId) {
  return (dispatch, getState) => {
    const {
      user: {token},
    } = getState();
    return fetch(
      `${FETCH_URL}/api/exhibition/exhibition/detail/artwork/?artworkId=${artworkId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
      },
    )
      .then(response => {
        if (response.status === 401) {
          dispatch(getLogout());
          return false;
        } else if (response.status === 404) {
          return false;
        } else {
          return response.json();
        }
      })
      .then(json => json);
  };
}

function getExhibitionReviewList(exhibitionId, filter) {
  return (dispatch, getState) => {
    const {
      user: {token},
    } = getState();
    return fetch(
      `${FETCH_URL}/api/statics/review/exhibition/?exhibitionId=${exhibitionId}&filter=${filter}&page=1`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
      },
    )
      .then(response => {
        if (response.status === 401) {
          dispatch(getLogout());
          return false;
        } else {
          return response.json();
        }
      })
      .then(json => json);
  };
}

function getExhibitionReviewListMore(exhibitionId, filter, page) {
  return (dispatch, getState) => {
    const {
      user: {token},
    } = getState();
    return fetch(
      `${FETCH_URL}/api/statics/review/exhibition/?exhibitionId=${exhibitionId}&filter=${filter}&page=${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
      },
    )
      .then(response => {
        if (response.status === 401) {
          dispatch(getLogout());
          return false;
        } else if (response.status === 404) {
          return false;
        } else {
          return response.json();
        }
      })
      .then(json => json);
  };
}

function createExhibitionReview(
  exhibitionId,
  rating,
  expression,
  content,
  title,
) {
  return (dispatch, getState) => {
    const {
      user: {token},
    } = getState();
    return fetch(`${FETCH_URL}/api/statics/review/exhibition/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        exhibitionId,
        rating,
        expression,
        content,
        title,
      }),
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(getLogout());
          return false;
        } else {
          return response.json();
        }
      })
      .then(json => json);
  };
}

function updateExhibitionReview(
  exhibitionId,
  reviewId,
  rating,
  expression,
  content,
  title,
) {
  return (dispatch, getState) => {
    const {
      user: {token},
    } = getState();
    return fetch(`${FETCH_URL}/api/statics/review/exhibition/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        exhibitionId,
        reviewId,
        rating,
        expression,
        content,
        title,
      }),
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(getLogout());
          return false;
        } else {
          return response.json();
        }
      })
      .then(json => json);
  };
}

function deleteExhibitionReview(exhibitionId, reviewId) {
  return (dispatch, getState) => {
    const {
      user: {token},
    } = getState();
    return fetch(`${FETCH_URL}/api/statics/review/exhibition/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        exhibitionId,
        reviewId,
      }),
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(getLogout());
          return false;
        } else {
          return response.json();
        }
      })
      .then(json => json);
  };
}

function getExhibitionLikeList(userId) {
  return (dispatch, getState) => {
    const {
      user: {token},
    } = getState();
    return fetch(`${FETCH_URL}/api/statics/like/exhibition/${userId}/?page=1`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(getLogout());
          return false;
        } else {
          return response.json();
        }
      })
      .then(json => json);
  };
}

function getExhibitionLikeListMore(userId, page) {
  return (dispatch, getState) => {
    const {
      user: {token},
    } = getState();
    return fetch(
      `${FETCH_URL}/api/statics/like/exhibition/${userId}/?page=${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
      },
    )
      .then(response => {
        if (response.status === 401) {
          dispatch(getLogout());
          return false;
        } else if (response.status === 404) {
          return false;
        } else {
          return response.json();
        }
      })
      .then(json => json);
  };
}

function viewExhibition(exhibitionId) {
  return (dispatch, getState) => {
    const {
      user: {token},
    } = getState();
    fetch(`${FETCH_URL}/api/exhibition/exhibition/view/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        exhibitionId,
      }),
    }).then(response => {
      if (response.status === 401) {
        dispatch(getLogout());
      }
    });
  };
}

const initialState = {
  newExhibitions: [],
  recommendedExhibitions: [],
  hotExhibitions: [],
  pastExhibitions: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_INITIAL_EXHIBITION:
      return applySetInitialExhibition(state, action);
    case SET_RECOMMENDED_EXHIBITION:
      return applySetRecommendedExhibition(state, action);
    default:
      return state;
  }
}

function applySetInitialExhibition(state, action) {
  const {initial} = action;
  return {
    ...state,
    initialStatus: initial.status,
    newExhibitions: initial.new_exhibitions,
    hotExhibitions: initial.hot_exhibitions,
    pastExhibitions: initial.past_exhibitions,
  };
}

function applySetRecommendedExhibition(state, action) {
  const {initial} = action;
  return {
    ...state,
    recommendedExhibitions: initial.recommended_exhibitions,
  };
}

const actionCreators = {
  initialExhibition,
  getRecommendedExhibition,
  likeExhibition,
  unlikeExhibition,
  getExhibitionList,
  getExhibitionListMore,
  getExhibitionDetailByArtwork,
  getExhibitionReviewList,
  getExhibitionReviewListMore,
  createExhibitionReview,
  getExhibitionLikeList,
  getExhibitionLikeListMore,
  updateExhibitionReview,
  deleteExhibitionReview,
  viewExhibition,
};

export {actionCreators};

export default reducer;
