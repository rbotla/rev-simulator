var agreementCtrl = require('./controllers/agreementCtrl');
var user = require('./controllers/user');
var router = require('express').Router();
var configFile = require('./config');
var jwt = require('jsonwebtoken');

router.get('/', agreementCtrl.getAllAgreements);
router.post('/agreement', agreementCtrl.onAddNewAgreement);
router.get('/agreement', agreementCtrl.getAllAgreements);
router.get('/agreement/:id', agreementCtrl.getAgreementById);

router.post('/register', user.register);
router.post('/login', user.login);
//router.get('/calcprogress', objectives.calcObjProgress);

// router.use(function(req, res, next) {

//   //FIXME
//   if (req.url === '/login' || req.url === '/register') {
//     return next();
//   }

// 	const tokenHeader = req.headers.authorization;
//   const token = tokenHeader.replace(/Token\s/, '');

//   if (token) {
//     jwt.verify(token, configFile.secret, function(err, decoded) {      
//       if (err) {
//         return res.json({ message: 'Failed to authenticate token.' });    
//       } else {
//         next();
//       }
//     });
//   } else {
//     res.status(403).send({
//         message: 'No token provided.' 
//     });
//   }
// });

module.exports = router;