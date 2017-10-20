import axios from 'axios';


/* -----------------    ACTION TYPES ------------------ */

const INITIALIZE = 'INITIALIZE_STUDENTS';
const CREATE     = 'CREATE_STUDENT';
const UPDATE     = 'UPDATE_STUDENT';
const REMOVE     = 'REMOVE_STUDENT';

/* ------------   ACTION CREATORS     ------------------ */

const init   = students => ({ type: INITIALIZE, students });
const create = student   => ({ type: CREATE, student });
const remove = id      => ({ type: REMOVE, id });
const update = student   => ({ type: UPDATE, student });

/* ------------       REDUCERS     ------------------ */

export default function reducer (students = [], action) {
  switch (action.type) {

    case INITIALIZE:
      return action.students;

    case CREATE:
      return [action.student, ...students];

    case REMOVE:
      return students.filter(student => student.id !== action.id);

    case UPDATE:
      return students.map(student => (
        action.student.id === student.id ? action.student : student
      ));

    default:
      return students;
  }
}

/* ------------   THUNK CREATORS     ------------------ */


export const fetchStudents = () => dispatch => {
  axios.get('/api/students')
       .then(res => dispatch(init(res.data)))
       .catch(err => console.error('Fetching students unsuccessful', err));
};

export const fetchStudent = (id) => dispatch => {
  axios.get(`/api/students/${id}`)
       .then(res => dispatch(update(res.data)))
       .catch(err => console.error('Fetching student unsuccessful', err));
};

// optimistic
export const removeStudent = id => dispatch => {
  dispatch(remove(id));
  return axios.delete(`/api/students/${id}`)
       .catch(err => console.error(`Removing student: ${id} unsuccessful`, err));
};

export const addStudent = student => dispatch => {
  return axios.post('/api/students/new', student)
       .then(res => dispatch(create(res.data)))
       .catch(err => console.error(`Creating student: ${student} unsuccessful`, err));
};

export const updateStudent = (id, student) => dispatch => {
  axios.put(`/api/students/${id}`, student)
       .then(res => dispatch(update(res.data)))
       .catch(err => console.error(`Updating student: ${student} unsuccessful`, err));
};
