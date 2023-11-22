// src/components/Navigation.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiHome, HiSearch, HiArchive } from 'react-icons/hi';
import { MdGroup } from 'react-icons/md'; // Adjust the import for your icons

import './index.css';

const Navigation = () => {
  return (
    <footer className="navigation">
      <NavLink to="/" className="iconWrapper" activeClassName="active" exact>
        <HiHome className="icon" />
      </NavLink>
      <NavLink to="/search" className="iconWrapper" activeClassName="active">
        <HiSearch className="icon" /> 
      </NavLink>
      <NavLink to="/category" className="iconWrapper" activeClassName="active">
        <HiArchive className="icon" /> 
      </NavLink>
      <NavLink to="/profile" className="iconWrapper" activeClassName="active">
        <MdGroup className="icon" />
      </NavLink>
    </footer>
  );
};

export default Navigation;
