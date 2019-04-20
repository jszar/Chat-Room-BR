import app from 'firebase/app';
import 'firebase/auth';


const config = {
  apiKey: "AIzaSyD6JkIh_TuMySG0hHSPRgE9Uu6IW3-HJeA",
  authDomain: "chat-room-br.firebaseapp.com",
  databaseURL: "https://chat-room-br.firebaseio.com",
  projectId: "chat-room-br",
  storageBucket: "chat-room-br.appspot.com",
  messagingSenderId: "358948435757",
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;
