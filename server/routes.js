var objectives = require('./controllers/objectives');
var employees = require('./controllers/employees');
var config = require('./controllers/config');
var comments = require('./controllers/comments');
var notifications = require('./controllers/notifications');
var user = require('./controllers/user');
var router = require('express').Router();
var configFile = require('./config');
var jwt = require('jsonwebtoken');

router.post('/register', user.register);
router.post('/login', user.login);
//router.get('/calcprogress', objectives.calcObjProgress);

router.use(function(req, res, next) {

  //FIXME
  if (req.url === '/login' || req.url === '/register') {
    return next();
  }

	const tokenHeader = req.headers.authorization;
  const token = tokenHeader.replace(/Token\s/, '');

  if (token) {
    jwt.verify(token, configFile.secret, function(err, decoded) {      
      if (err) {
        return res.json({ message: 'Failed to authenticate token.' });    
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({
        message: 'No token provided.' 
    });
  } 
});

router.get('/objectives/getAllParentObjectives', objectives.getAllParentObjectives);
// router.get('/empobjprogress', objectives.getObjectivesProgress);
router.get('/objectives/filter', objectives.findByName);
// router.get('/objectives/hierarchy', objectives.getParentObjectives);
router.get('/myobjectives', objectives.findByOwner);

router.get('/objectives', objectives.findAll);
router.get('/objectives/:id', objectives.findById);

router.get('/childobjectives', objectives.getChildObjectives);

router.post('/objectives', objectives.add);
router.put('/objectives/:id', objectives.update);
router.delete('/objectives/:id', objectives.delete);
router.get('/objectives/import', objectives.import);

router.post('/objectives/:id/keyresults', objectives.addKeyResult);
router.post('/keyresults/checkin', objectives.checkinKeyResults);

router.get('/keyresults/filter', objectives.findKeyResultsByEmp);

router.get('/employees/filter', employees.findByName);
router.get('/employees/import', employees.import);
router.get('/employees/findById', employees.findById);

router.get('/config', config.findByName);

router.post('/comments', comments.addNewComment);
router.get('/comments', comments.getCommentsByRefId);

router.get('/notifications', notifications.getNotificationByPerson);

module.exports = router;