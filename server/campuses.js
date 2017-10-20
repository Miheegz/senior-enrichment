const router = require('express').Router();
const { Campus } = require('../db/models');

module.exports= router;


//  '/api/campuses' => Find all campuses
router.get('/', function(req, res, next) {
  Campus.findAll()
  .then(campuses => res.json(campuses))
  .catch(next)
});

//  '/api/campuses/:campusId' => Find one campus
router.get('/:campusId', function(req, res, next) {
  Campus.findById(req.params.campusId)
  .then(campus => res.json(campus))
  .catch(next)
});

//  '/api/campuses/new' => create campus
router.post('/new', function(req, res, next) {
  Campus.create(req.body)
  .then(campus => res.json(campus))
  .catch(next)
});

//  '/api/campuses/:campusId' => update a campus' info
router.put('/:campusId', function(req, res, next) {
  Campus.findById(req.params.campusId)
  .then(campus => campus.update(req.body))
  .then(() => res.status(204).end())
  .catch(next)
});

//  '/api/campuses/:campusId' => update a campus' info
router.delete('/:campusId', function(req, res, next) {
  Campus.destroy({where: {id: req.params.campusId}})
  .then(() => res.status(204).end())
  .catch(next)
})
