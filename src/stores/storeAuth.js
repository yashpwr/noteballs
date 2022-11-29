// stores/counter.js
import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from '../js/firebase';

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {

    }
  },
  actions: {
    registerUser(credentials){
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        }).catch((error) => {
          console.log(error.message);
      });
      console.log('register user action', credentials);
    },
    logoutUser() {
      signOut(auth).then(() => {
        console.log('user signed Out');
      }).catch((error) => {
        console.log(error.message);
      });
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
    }
  },

})