import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Home = () => {
  const { currUser, handleSignIn, handleSignOut } = useContext(AuthContext);
  return (
    <div>
      <h3>Home</h3>
      {currUser ? (
        <div>
          <button onCLick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
    </div>
  );
};

export default Home;
