import  React, {Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeStudent } from '../reducers/studentReducer';


class StudentItem extends Component {

  constructor() {
    super();

    this.handleRemove = this.handleRemove.bind(this);
  }

  render() {

    const student = this.props.student;
    return (


      <div className="list-group-item min-content user-item">
        <div className="media">
          {/* <div className="media-left media-middle icon-container">
          <img className="media-object img-circle" src={student.photo} />
        </div>
    */}
          <NavLink
            className="media-body"
            activeClassName="active"
            to={`/students/${student.id}`}>
            <h4 className="media-heading tucked">
              <span >{student.name}</span>
            </h4>
            <h5 className="tucked">
              <span>{student.email}</span>
            </h5>
            <h5 className="tucked">
              <span>{student.campus.name}</span>
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
    const { removeStudent, student } = this.props;
    event.stopPropagation();
    removeStudent(student.id);
  }
}

const mapState = (state, ownProps) => ({ student: ownProps.student });
const mapDispatch = { removeStudent };

export default connect(mapState, mapDispatch)(StudentItem);
