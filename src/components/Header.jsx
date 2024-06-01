import React from "react";

const Header = ({ className }) => {
  return (
    <nav className={className}>
      <h3>CRUD-24</h3>
      <ul>
        <li>Link1</li>
        <li>Link1</li>
        <li>Link1</li>
      </ul>
      <button>Sign Out</button>
    </nav>
  );
};

export default Header;
