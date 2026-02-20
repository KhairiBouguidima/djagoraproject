import { auth } from "./firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  sendEmailVerification,
  deleteUser,
  GoogleAuthProvider 
} from "firebase/auth";

// 1. Create User
export const doCreateUserWithEmailAndPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// 2. Sign In
export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// 3. Google Sign In
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

// 4. Sign Out
export const doSignOut = () => {
  return signOut(auth);
};

// 5. Password Reset
export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// 6. Update Password
export const doPasswordUpdate = (password) => {
  return updatePassword(auth.currentUser, password);
};

// 7. Email Verification
export const doEmailVerification = () => {
  return sendEmailVerification(auth.currentUser);
};

// 8. Delete User
export const doDeleteUser = () => {
  return deleteUser(auth.currentUser);
};

