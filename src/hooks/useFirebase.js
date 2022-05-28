import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../firebase.config";
import useImgUpload from "./useImgUpload";
import useToken from "./useToken";

const useFirebase = () => {
  const storeImg = useImgUpload();
  const setToken = useToken();

  const [user, setUser] = useState({});

  const updateUserState = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await setUser(user);
        await setToken(user);
      }
    });
  };

  const [errorMsg, setErrorMsg] = useState("");
  const googleProvider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const home = "/";

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        await updateUserState();
      })
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMsg(errorMessage);
      });
  };

  const createUserWithEmail = (name, email, photo, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const img = await storeImg(photo);
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: img,
        });
        setErrorMsg("");
        await sendEmailVerification(auth.currentUser);
        await updateUserState();
      })
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMsg(errorMessage);
      });
  };

  const handleLogIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await userCredential.user;
        await updateUserState();
      })
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMsg(errorMessage);
      });
  };

  const handlePasswordReset = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setErrorMsg("");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMsg(errorMessage);
      });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_role");
        localStorage.removeItem("user_id");
        localStorage.removeItem("profile_id");
      })
      .then(() => {
        navigate(home, { replace: true });
      });
  };

  return {
    handleGoogleSignIn,
    createUserWithEmail,
    handlePasswordReset,
    handleLogIn,
    user,
    logOut,
    errorMsg,
  };
};

export default useFirebase;
