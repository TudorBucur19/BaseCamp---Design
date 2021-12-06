import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import firebase from '../utils/firebase';

export const AuthenticationContext = createContext();

const AuthenticationContextProvider = (props) => {
  const [user, setUser] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(true);
  const history = useHistory();

  const clearInputs = () => {
    setEmail('');
    setPassword('');
    setUserName('');
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () => {
    clearErrors();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch(err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          default: console.log(err);
          }
      })
      .then(history.push('/campgrounds'));
  };

  const handleSignup = (userPhoto) => {
    clearErrors();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(result) {
        return result.user.updateProfile({
          displayName: userName,
          photoURL: userPhoto,
        })
      })
      .catch((err) => {
        switch(err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          default: console.log(err);
          }
      });
  };

  const handleLogout = () =>  {
    firebase.auth().signOut();
  };

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    })
    
  };

  useEffect(() => {
    authListener();
  }, []);

  const values = {
    user,
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    handleLogout,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
    userName,
    setUserName
  }

    return (
        <AuthenticationContext.Provider value={ values }>
            {props.children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationContextProvider;