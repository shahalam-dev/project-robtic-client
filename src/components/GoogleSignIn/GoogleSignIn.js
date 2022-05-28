import React from "react";
import useFirebase from "../../hooks/useFirebase";

const GoogleSignIn = () => {
  const { handleGoogleSignIn } = useFirebase();
  return (
    <button
      className="btn btn-outline btn-secondary md:btn-wide"
      onClick={handleGoogleSignIn}
    >
      Sign Up with Google
    </button>
  );
};

export default GoogleSignIn;
