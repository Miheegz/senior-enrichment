import  React, {Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeCampus } from '../reducers/campusReducer';
import { fetchStudents } from '../reducers/studentReducer'

class CampusItem extends Component {

  constructor() {
    super();

    this.handleRemove = this.handleRemove.bind(this);
  }

  render() {

const campus = this.props.campus;
    return (


      <div className="list-group-item min-content user-item">
        <div className="media">
          {/* <div className="media-left media-middle icon-container">
          <img className="media-object img-circle" src={campus.photo} />
        </div>
    */}
          <NavLink
            className="media-body"
            activeClassName="active"
            to={`/campuses/${campus.id}`}>
            <h4 className="media-heading tucked">
              <span >{campus.name}</span>
            </h4>
            <h5 className="tucked">
              <span>{campus.address}</span>
            </h5>
            <h5 className="tucked">
              <span>{campus.phonenumber}</span>
            </h5>
          </NavLink>
          <div className="media-right media-middle">

            <button
              className="btn btn-default"
              onClick={this.handleRemove}>
              <span className="glyphicon glyphicon-remove" />
            </button>

          </div>
        </div>
      </div>

    );

  }
  handleRemove(event) {
    const { removeCampus, campus, fetchStudents } = this.props;
    event.stopPropagation();
    removeCampus(campus.id)
    .then(fetchStudents())
  }
}

const mapState = (state, ownProps) => ({ campus: ownProps.campus });
const mapDispatch = { removeCampus, fetchStudents };

export default connect(mapState, mapDispatch)(CampusItem);
