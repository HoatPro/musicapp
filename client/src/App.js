import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from './components/Home';
import Category from './components/Category';
import Playlist from './components/Playlist';
import Tracks from './components/Tracks';
import Search from './components/Search';
import Music from './components/Music';

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
  return (
    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
      var active = match ? "active abc" : "";
      return (
        <li className={active}>
          <NavLink to={to} className="my-link">
            {label}
          </NavLink>

        </li>
      )
    }} />
  )
}

class App extends Component {

  render() {
    return <Router>
        <div className="App">
          <nav className="navbar navbar-inverse">
            <a className="navbar-brand" href="">
              MUSIC ECHO
            </a>
            <ul className="nav navbar-nav">
              <MenuLink label="Home" to="/" activeOnlyWhenExact={true} />
              <MenuLink label="Playlist" to="/playlist" activeOnlyWhenExact={true} />
              <MenuLink label="Category" to="/categories" activeOnlyWhenExact={true} />
              <MenuLink label="Tracks" to="/tracks" activeOnlyWhenExact={true} />
              <MenuLink label="Music" to="/music" activeOnlyWhenExact={true} />

              <MenuLink label="Search" to="/search" activeOnlyWhenExact={true} />
            </ul>
          </nav>
          <Route path="/" exact component={Home} />
          <Route path="/playlist" component={Playlist} />
          <Route path="/categories" component={Category} />
          <Route path="/tracks" component={Tracks} />
          <Route path="/music" component={Music} />
          <Route path="/search" component={Search} />
        </div>
      </Router>;

  }
}

export default App;
