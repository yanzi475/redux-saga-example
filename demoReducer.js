import { combineReducers } from 'redux'
import { createActions } from 'redux-actions';
import { put, call, takeEvery } from 'redux-saga/effects';
import { handleActions } from 'redux-actions';

cnost getActions = {
  [getUserRequested]: state => {
    return {
      ...state,
      isLogging: true
    };
  },
  [getUserSucceed]: (state, { payload: { avatar, name, email } }) => {
    return {
      ...state,
      isLogging: false,
      user: {
        avatar,
        name,
        email
      }
    };
  },
  [getUserFailed]: state => {
    return {
      ...state,
      isLogging: false
    };
  }
};

function* getUser({ payload: { callback } }) {
  try {
    const user = yield call(fetch, {
      // method: "POST"
      resource: ''
    });
    yield put(
      getUserSucceed({
        avatar: user.avatar,
        name: user.name,
        email: user.email
      })
    );
    
  } catch (e) {
    yield put(getUserFailed());
    yield put(
      showModal({
        type: 'text',
        content: {
          level: 'error',
          title: 'Failed get user info',
          description: e.message
        }
      })
    );
  }
}

const watchGet  = function* watchGet() {
  yield takeEvery(getUserRequested, getUser);
}


export const watchdemoSagas= [watchGet];


export const watchAppSagas = [
  ...watchdemoSagas
]

export default combineReducers({
  demo: getActions,
})
