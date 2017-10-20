import React, { Component } from 'react';
import StudentItem from './StudentItem'
import { connect } from 'react-redux';
import {addStudent, fetchStudents} from '../reducers/studentReducer'

class StudentList extends Component {

  constructor(props) {
    super(props);

    this.renderAddNewStudent = this.renderAddNewStudent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    const students = this.props.students;


    return (
      <div className="container">
        <div className="user-query">
        { this.renderAddNewStudent() }
        </div>
        <br />
        <div className="user-list">

          {
            students.map(student => <StudentItem student={student} key={student.id} />)
          }

        </div>
      </div>
        );
  }


renderAddNewStudent() {
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
              placeholder="Student Name"
              className="form-like"
            />
          </h4>
          <h5 className="tucked">
            <input
              name="email"
              type="email"
              required
              placeholder="name@gmail.com"
              className="form-like"
            />
          </h5>
            <h5>
            <select name="campusId" defaultValue="" required>
            <option value="" disabled>(Choose a campus)</option>
            {
              this.props.campuses.map(campus => (
                <option key={campus.id} value={campus.id}>{campus.name}</option>
              ))
            }
          </select>
          </h5>
        </div>
      </form>
    </div>
  );
}
onSubmit(event) {
  event.preventDefault();
  const student = {
    name: event.target.name.value,
    email: event.target.email.value,
    campusId: event.target.campusId.value
  };
  this.props.addStudent(student)
  .then(this.props.fetchStudents() )
  event.target.campusId.value = ''
  event.target.name.value = ''
  event.target.email.value = ''
}
}

const mapState = (state) => ({ students: state.studentReducer, campuses: state.campusReducer })

const mapDispatch = {addStudent, fetchStudents};

export default connect(mapState, mapDispatch)(StudentList)
