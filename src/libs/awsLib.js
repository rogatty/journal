import { CognitoUserPool } from "amazon-cognito-identity-js";

export function authUser() {
  const currentUser = getCurrentUser();

  if (currentUser === null) {
    return Promise.reject("User is not logged in");
  }

  return getUserToken(currentUser).then(() => {
    return true;
  });
}

function getUserToken(currentUser) {
  return new Promise((resolve, reject) => {
    currentUser.getSession(function(err, session) {
      if (err) {
        reject(err);
        return;
      }
      resolve(session.getIdToken().getJwtToken());
    });
  });
}

function getCurrentUser() {
  const userPool = new CognitoUserPool({
    // Replaced during the build by config/env.js
    UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    ClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID
  });
  return userPool.getCurrentUser();
}

export function signOutUser() {
  const currentUser = getCurrentUser();

  if (currentUser !== null) {
    currentUser.signOut();
  }
}
