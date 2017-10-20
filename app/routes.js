import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import history from './history';
import Home from './components/Home.jsx'
import StudentsList from './components/StudentsList.jsx'
import { fetchCampuses } from './reducers/campusReducer'
import { fetchStudents } from './reducers/studentReducer'
import  CampusDetail  from './components/CampusDetail.jsx'
import Navbar from './components/Navbar'


class Routes extends Component {


  componentDidMount () {
    this.props.fetchInitialData();
  }
  // componentWillMount () {
  //   this.props.fetchInitialData();
  // }

  render(){
    return (
      <Router history= { history } >
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/students" component={StudentsList} />



        </Switch>
      </div>
      </Router>
    )}
}

const mapProps = null;

const mapDispatch = dispatch => ({

  fetchInitialData: () => {
    dispatch(fetchStudents());
    dispatch(fetchCampuses());

  }
});

export default connect(mapProps, mapDispatch)(Routes);
