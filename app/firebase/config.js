const prodConfig = {
  apiKey: "AIzaSyCFzZN_TYd1JGq2YAI5pdKJ7paanBUZxpY",
  authDomain: "roll-for-initiatve.firebaseapp.com",
  databaseURL: "https://roll-for-initiatve.firebaseio.com",
  storageBucket: "roll-for-initiatve.appspot.com",
  messagingSenderId: "189843721703"
};

const devConfig = {
  apiKey: "AIzaSyCkOlCKttdmodeubldISVnyH-0MOM_3kqg",
  authDomain: "roll-for-initiative-dev.firebaseapp.com",
  databaseURL: "https://roll-for-initiative-dev.firebaseio.com",
  storageBucket: "roll-for-initiative-dev.appspot.com",
  messagingSenderId: "591901044847"
};

export default const firebaseConfig = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
