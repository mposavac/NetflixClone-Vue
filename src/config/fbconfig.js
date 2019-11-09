const firebase = require('firebase/app');
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

var firebaseConfig = {
  apiKey: 'AIzaSyDpdZNZpe-YklsvCs_4ZB0BwyTFkjSmzlQ',
  authDomain: 'netflixclone-vue.firebaseapp.com',
  databaseURL: 'https://netflixclone-vue.firebaseio.com',
  projectId: 'netflixclone-vue',
  storageBucket: 'netflixclone-vue.appspot.com',
  messagingSenderId: '655210080471',
  appId: '1:655210080471:web:4071b2153a2f812506a892',
  measurementId: 'G-1RT42ST1NJ'
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const fs = firebase.firestore();
export default firebase;
