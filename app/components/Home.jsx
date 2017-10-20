import React, { Component } from 'react';
import CampusItem from './CampusItem'
import { connect } from 'react-redux';
import {addCampus, fetchCampuses} from '../reducers/campusReducer'
 class Home extends Component {

  constructor(props) {
    super(props);
    this.renderAddNewCampus = this.renderAddNewCampus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  render() {

    return (
      <div className="container">
        <div className="user-query">
          { this.renderAddNewCampus() }
        </div>
        <br />
         <div className="user-list">
         {

           this.props.campuses
             .map(campus => {
              return (

               <CampusItem campus={campus} key={campus.id} />

             )})
         }
         </div>
      </div>

    );
  }

renderAddNewCampus() {
  return (
    <div className="list-group-item min-content user-item">
      <form className="media" onSubmit={this.onSubmit}>
        <div className="media-left media-middle icon-container">
          <button
            type="submit"
            className="btn btn-warning btn-xs pull-right">
            <span className="glyphicon glyphicon-plus" />
          </button>
        </div>
        <div className="media-body">
          <h4 className="media-heading tucked">
            <input
              name="name"
              type="text"
              required
              placeholder="Campus Name"
              className="form-like"
            />
          </h4>
          <h5 className="tucked">
            <input
              name="address"
              type="text"
              required
              placeholder="1234 callstack Lane"
              className="form-like"
            />
          </h5>
          <h5 className="tucked">
          <input
            name="phonenumber"
            type="tel"
            required
            placeholder="(555-555-5555)"
            className="form-like"
          />
        </h5>
        </div>
      </form>
    </div>
  );
}
onSubmit(event) {
  event.preventDefault();
  const campus = {
    name: event.target.name.value,
    address: event.target.address.value,
    phonenumber: event.target.phonenumber.value
  };
  this.props.addCampus(campus)
  .then(this.props.fetchCampuses() )
  event.target.name.value = ''
  event.target.address.value = ''
  event.target.phonenumber.value = ''
}


}


const mapState = ( {campusReducer} ) => ({ campuses: campusReducer });


const mapDispatch = {addCampus, fetchCampuses};

export default connect(mapState, mapDispatch)(Home);
