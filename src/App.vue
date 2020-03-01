<template>
  <div id="q-app" class="app-font">
    <router-view />
  </div>
</template>

<script>
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAT29-E2Mx8PjTCBs1lwDjsE0QNBHECCmo",
  authDomain: "pray-app-1e433.firebaseapp.com",
  databaseURL: "https://pray-app-1e433.firebaseio.com",
  projectId: "pray-app-1e433",
  storageBucket: "pray-app-1e433.appspot.com",
  messagingSenderId: "504848602290",
  appId: "1:504848602290:web:b26708fa60617a1e8a65ab"
};

export default {
  name: "App",
  preFetch({ store }) {
    // TODO: SET PRODUCTION CONFIG WHEN CI PUSHES TO PRODUCTION
    firebase.initializeApp(firebaseConfig);
    firebase.auth().useDeviceLanguage();
    const $db = firebase.firestore();
    // Put firebase functionality into
    // state for future access
    Object.assign(store.state, {
      $db: firebase.firestore(),
      $firebase: firebase
    });
  }
};
</script>

