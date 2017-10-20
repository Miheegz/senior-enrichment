const db = require('./db');
const Campus = require('./db/models/campus');
const Student = require('./db/models/student');


const campuses = [
  { name: 'really_random' },
  { name: 'generally_speaking' },
  { name: 'dogs_of_fullstack' },
  { name: 'lunch_planning' }
];



const students = [{
  name: 'Cody',
  image: '/images/cody.jpg',
  campusId: 1
}, {
  name: 'Ben',
  image: '/images/ben.jpg',
  campusId: 1
}, {
  name: 'Star',
  image: '/images/star.jpg',
  campusId: 1
}, {
  name: 'Batman',
  image: '/images/batman.jpg',
  campusId: 1
}, {
  name: 'Elliott',
  image: '/images/elliott.jpg',
  campusId: 1
}, {
  name: 'Fira',
  image: '/images/fira.jpg',
  campusId: 1
}, {
  name: 'Henry',
  image: '/images/henry.jpg',
  campusId: 1
}, {
  name: 'Marcy',
  image: '/images/marcy.jpg',
  campusId: 2
}, {
  name: 'Milton',
  image: '/images/milton.jpg',
  campusId: 2
}, {
  name: 'Murphy',
  image: '/images/murphy.jpg',
  campusId: 2
}, {
  name: 'Raffi',
  image: '/images/raffi.jpg',
  campusId: 2
}, {
  name: 'Tulsi',
  image: '/images/tulsi.jpg',
  campusId: 2
}, {
  name: 'Pork Chop',
  image: '/images/pork_chop.jpg',
  campusId: 2
}, {
  name: 'Ribs',
  image: '/images/ribs.jpg',
  campusId: 3
}, {
  name: 'Stacey',
  image: '/images/stacey.jpg',
  campusId: 3
}, {
  name: 'JD',
  image: '/images/jd.jpg',
  campusId: 3
}, {
  name: 'BenBen',
  image: '/images/benben.png',
  campusId: 4
}, {
  name: 'Odie',
  image: '/images/odie.jpg',
  campusId: 4
}];


const email = (student) => `${student.name}@gmail.com`;

const studentEmails= students.map(student => {
  return {
    name: student.name,
    image: student.image,
    campusId: student.campusId,
    email: email(student)
  }
} )


const seed = () =>
  Promise.all(campuses.map(campus =>
    Campus.create(campus))
  )
  .then(() =>
  Promise.all(studentEmails.map(student =>
    Student.create(student))
  ));

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
