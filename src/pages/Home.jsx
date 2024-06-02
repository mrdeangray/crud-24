import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Home = () => {
  const { currUser, handleSignIn, handleSignOut } = useContext(AuthContext);
  return (
    <div>
      <h3>Home</h3>
      {currUser ? (
        <div>
          <button onClick={handleSignOut}>Sign Out</button>
          <Link to={`/readtasks`}>
            <button>Read Tasks</button>
          </Link>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
    </div>
  );
};

export default Home;
