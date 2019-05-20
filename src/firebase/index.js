import app from '@firebase/app';
// import '@firebase/auth';
import '@firebase/database';
// import '@firebase/firestore';

const config = {
  apiKey: "AIzaSyC1il7roSwdkaSoGBzdyfrv3-l8AwI3slA",
  authDomain: "chattery-cbb2d.firebaseapp.com",
  databaseURL: "https://chattery-cbb2d.firebaseio.com",
  projectId: "chattery-cbb2d",
  storageBucket: "chattery-cbb2d.appspot.com",
  messagingSenderId: "928027739216",
  appId: "1:928027739216:web:e528c5e7f3dd89d4"
};

app.initializeApp(config);

export default app;
