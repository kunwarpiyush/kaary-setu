const express = require('express');
const router = express.Router();
const controler = require('../controllers/controler');

router.get('/', controler.getHome);
router.get('/about', controler.getAbout);
router.get('/jobs', controler.getJobs);
router.get('/post-job', controler.getPostJob);
router.get('/signup', controler.getSignUp);
router.post('/signup', controler.postSignUp);

router.get('/login', controler.getLogin);
router.post('/login', controler.postLogin);

router.post('/post-job', controler.postJob);

router.get('/logout', controler.getLogout);

module.exports = router;