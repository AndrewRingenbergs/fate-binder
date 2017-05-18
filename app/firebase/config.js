const prodConfig = {
  apiKey: 'AIzaSyDiMn4AwNzczQXoPXuwWnnKhPeHgWHdY5Y',
  authDomain: 'fate-binder.firebaseapp.com',
  databaseURL: 'https://fate-binder.firebaseio.com',
  projectId: 'fate-binder',
  storageBucket: 'fate-binder.appspot.com',
  messagingSenderId: '1060702126363',
};

// const devConfig = {
//   apiKey: 'AIzaSyCkOlCKttdmodeubldISVnyH-0MOM_3kqg',
//   authDomain: 'roll-for-initiative-dev.firebaseapp.com',
//   databaseURL: 'https://roll-for-initiative-dev.firebaseio.com',
//   storageBucket: 'roll-for-initiative-dev.appspot.com',
//   messagingSenderId: '591901044847',
// };

export default process.env.NODE_ENV === 'production' ? prodConfig : prodConfig;
