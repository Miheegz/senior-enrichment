import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import history from '../history';

/* -----------------    COMPONENT     ------------------ */

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.renderHomePage = this.renderHomePage.bind(this);
    this.renderStudentsPage = this.renderStudentsPage.bind(this);
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">

            <Link className="navbar-brand" to="/"><img src="/images/logo.png" /></Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <NavLink to="/" activeClassName="active">Margaret Hamilton Interplanetary Academy of JavaScript</NavLink>
              </li>
            </ul>

            { this.renderHomePage() }
            { this.renderStudentsPage() }


          </div>
        </div>
      </nav>
    );
  }





  renderHomePage() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
        <button
           className="navbar-btn btn btn-default">
           <NavLink to="/">
          Home
          </NavLink>
        </button>
        </li>
      </ul>
    );
  }

  renderStudentsPage() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
        <button
          className="navbar-btn btn btn-default">
          <Link to='/students'>
          Students
          </Link>
        </button>
        </li>
      </ul>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

// const mapProps = null;

// const mapDispatch = dispatch => null

export default Navbar;
