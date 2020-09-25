import App from './components/App';
import { createFirestoreInstance } from 'redux-firestore';
import { createStore } from 'redux';
import firebase from "./firebase";
import 'firebase/auth';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import * as serviceWorker from './serviceWorker';

const store = createStore(rootReducer);

const rrfProps = {
  firebase,
  config: {
        userProfile: "users",
        useFirestoreForProfile: true
    },
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
