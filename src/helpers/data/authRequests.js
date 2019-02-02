import firebase from 'firebase/app';
import 'firebase/auth';

const authenticate = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

const facebookAuthenticate = () => {
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(facebookProvider);
};

const logoutUser = () => firebase.auth().signOut();

const getCurrentUid = () => firebase.auth().currentUser.uid;

export default {
  authenticate,
  logoutUser,
  getCurrentUid,
  facebookAuthenticate,
};
