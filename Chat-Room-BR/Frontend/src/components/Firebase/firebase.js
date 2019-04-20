import app from 'firebase/app';

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
  }
}

export default Firebase;
