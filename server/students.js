const router = require('express').Router();
const { Student } = require('../db/models');

module.exports = router;


//  '/api/students' => Find all students
router.get('/', function(req, res, next) {
  Student.findAll({include: ['campus']})
  .then(students => res.json(students))
  .catch(next)
});

//  '/api/students/:studentId' => Find one student
router.get('/:studentId', function(req, res, next) {
  Student.findById(req.params.studentId, {include: ['campus']})
  .then(student => res.json(student))
  .catch(next)
});

//  '/api/students/new' => create student
router.post('/new', function(req, res, next) {
  Student.create(req.body)
  .then(result => {
    Student.findById(result.id, {include: ['campus']})
    .then(student => res.json(student))
  })
  .catch(next)
});

//  '/api/students/:studentId' => update a students info
router.put('/:studentId', function(req, res, next) {
  Student.findById(req.params.studentId)
  .then(student => student.update(req.body))
  .then(() => res.status(204).end())
  .catch(next)
});

//  '/api/students/:studentId' => update a students info
router.delete('/studentId', function(req, res, next) {
  Student.destroy({where: {id: req.params.studentId}})
  .then(() => res.status(204).end())
  .catch(next)
})
