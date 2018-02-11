import { CognitoUserPool } from "amazon-cognito-identity-js";
import AWS from "aws-sdk";
import AwsSigner from "./signRequest";
import uuid from "./uuid";

export function authUser() {
  if (
    AWS.config.credentials &&
    Date.now() < AWS.config.credentials.expireTime - 60000
  ) {
    return true;
  }

  const currentUser = getCurrentUser();

  if (currentUser === null) {
    return Promise.reject("User is not logged in");
  }

  return getUserToken(currentUser)
    .then(getAwsCredentials)
    .then(() => {
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

function getAwsCredentials(userToken) {
  const region = "eu-central-1";
  const authenticator = `cognito-idp.${region}.amazonaws.com/${
    process.env.REACT_APP_COGNITO_USER_POOL_ID
  }`;

  AWS.config.update({ region });

  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
    Logins: {
      [authenticator]: userToken
    }
  });

  return AWS.config.credentials.getPromise();
}

export function signedFetch(path, { body, headers, method }) {
  const url = `${process.env.REACT_APP_API_GATEWAY_URL}${path}`;
  const { accessKeyId, secretAccessKey, sessionToken } = AWS.config.credentials;

  const signer = new AwsSigner({
    accessKeyId,
    region: "eu-central-1",
    secretAccessKey,
    sessionToken
  });

  const signedHeaders = signer.sign({
    method,
    url,
    headers,
    body
  });

  return fetch(url, {
    method,
    headers: signedHeaders,
    body
  });
}

export async function s3Upload(file) {
  if (!await authUser()) {
    throw new Error("User is not logged in");
  }

  const s3 = new AWS.S3({
    params: {
      Bucket: process.env.REACT_APP_S3_BUCKET
    }
  });

  const key = `${AWS.config.credentials.identityId}-${Date.now()}-${uuid()}`;

  return s3
    .upload({
      Key: key,
      Body: file,
      ContentType: file.type
    })
    .promise();
}
