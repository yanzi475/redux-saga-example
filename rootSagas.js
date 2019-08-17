import { all, call } from 'redux-saga/effects';
import { watchAppSagas } from './reducers/demoReducer';

export const sagas = function* rootSaga() {
  yield all(
    [
      ...watchAppSagas,
    ].map(call)
  );
};
