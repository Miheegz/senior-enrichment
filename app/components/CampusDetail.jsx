import React, { Component } from 'react';
import StudentItem from './StudentItem'
import { connect } from 'react-redux';
import { fetchStudents } from '../reducers/studentReducer'
import { updateCampus } from '../reducers/campusReducer'

class CampusDetail extends Component {

  constructor(props) {
    super(props);

    this.renderEditCampus = this.renderEditCampus.bind(this);
    // this.renderEditStudents = this.renderEditStudents.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

// componentWillReceiveProps(nextProps) {
//  console.log("NEXTPROPS", nextProps)
//   this.setState({campuses: nextProps.campuses, students: nextProps.students})
// }
  render() {
    const id = this.props.match.params.id;


    const students = this.props.students;
    const campusStudents = students.filter(student => student.campusId === id)

    return (
      <div className="container">
      <div className="user-query">
      { this.renderEditCampus() }
      </div>
      <br />

      <div className="user-list">

      {students.length ?
        campusStudents.map(student => <StudentItem student={student} key={student.id} />)
        : <div />
      }

      </div>
      </div>
    );
  }

  renderEditCampus() {
        const id = this.props.match.params.id;
        const campus = this.props.campuses.filter( element => element.id === +id)
        console.log('campus', campus, 'this.props.campuses', this.props.campuses)
    return (
      <div className="list-group-item min-content user-item">
        <form className="media" onSubmit={this.onEditSubmit}>
          <div className="media-left media-middle icon-container">
            <button
              type="submit"
              className="btn btn-warning btn-xs pull-right"> EDIT
              <span className="glyphicon glyphicon-plus" />
            </button>
          </div>
          <div className="media-body">
            <h4 className="media-heading tucked">
              <input
                name="name"
                type="text"
                required
                placeholder={campus ? campus.name : 'new name' }
                className="form-like"
              />
            </h4>
            <h5 className="tucked">
              <input
                name="address"
                type="text"
                required
                placeholder={campus ? campus.address : 'address' }
                className="form-like"
              />
            </h5>
            <h5 className="tucked">
            <input
              name="phonenumber"
              type="tel"
              required
              placeholder={campus ? campus.phonenumber : 'phonenumber' }
              className="form-like"
            />
          </h5>
          </div>
        </form>
      </div>
    );
  }

  // renderEditStudents() {
  //   return (
  //     <div>
  //     <form onSubmit={this.onStudentSubmit}>
  //     <button>
  //     </button>
  //       <h5>
  //       <select name="student" defaultValue="" required>
  //       <option value="" disabled>(Choose a student)</option>
  //       {
  //         this.props.campusStudents.map(student => (
  //           <option key={student.id} value={student.id}>{student.name}</option>
  //         ))
  //       }
  //       </select>
  //       </h5>
  //     </form>
  //     </div>
  //   );
  // }
  onEditSubmit(event) {
    event.preventDefault();
    const campus = {
      name: event.target.name.value,
      address: event.target.address.value,
      phonenumber: event.target.phonenumber.value
    };
    this.props.updateCampus(campus)
    .then(this.props.fetchStudents() )
    event.target.name.value = ''
    event.target.address.value = ''
    event.target.phonenumber.value = ''
  }

  // onStudentSubmit(event) {
  //   event.preventDefault();
  //   const student = {
  //     campusId: event.target.name.value,

  //   };
  //   this.props.updateCampus(campus)
  //   .then(this.props.fetchStudents() )
  //   event.target.name.value = ''
  //   event.target.address.value = ''
  //   event.target.phonenumber.value = ''
  // }

}


const mapState = ( {studentReducer, campusReducer}) => ({ students: studentReducer, campuses: campusReducer });


const mapDispatch = {updateCampus, fetchStudents};

export default connect(mapState, mapDispatch)(CampusDetail);
