const User = require('../models/user');
const JobDetail = require('../models/jobdetail');

exports.getHome = (req, res, next) => {
    res.render('home', {
        pageTitle: 'Home',
        path: '/',
        isLoggedIn: req.session ? req.session.isLoggedIn : false,
        user: req.session ? req.session.user : null,
    });
};
exports.getAbout = (req, res, next) => {
    res.render('about', {
        pageTitle: 'About',
        path: '/about',
        isLoggedIn: req.session ? req.session.isLoggedIn : false,
        user: req.session ? req.session.user : null,
    });
};
exports.getJobs = (req, res, next) => {
    res.render('jobs', {
        pageTitle: 'Jobs',
        path: '/jobs',
        isLoggedIn: req.session ? req.session.isLoggedIn : false,
        user: req.session ? req.session.user : null,
    });
};
exports.getPostJob = (req, res, next) => {
    res.render('post-job', {
        pageTitle: 'Post Job',
        path: '/post-job',
        isLoggedIn: req.session ? req.session.isLoggedIn : false,
        user: req.session ? req.session.user : null,
    });
};

exports.getSignUp = (req, res, next) => {
    res.render('signup', {
        pageTitle: 'Sign Up',
        path: '/signup',
        oldInput: {},
    });
};

exports.getLogin = (req, res, next) => {
    res.render('login', {
        pageTitle: 'Login',
        path: '/login',
    });
};

exports.postSignUp = async (req, res, next) => {
    const { Name, Mobile, role, Password } = req.body;
    try {
        if (!Name || !Mobile || !role || !Password) {
            return res.redirect('/signup');
        }
        const existing = await User.findOne({ Mobile });
        if (existing) {
            return res.redirect('/signup');
        }
        const user = new User({ Name, Mobile, role, Password });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        next(err);
    }
};

exports.postLogin = async (req, res, next) => {
    const { Mobile, Password } = req.body;
    try {
        if (!Mobile || !Password) return res.redirect('/login');
        const user = await User.findOne({ Mobile, Password });
        if (!user) return res.redirect('/login');
        req.session.user = user;
        req.session.isLoggedIn = true;
        req.session.save((err) => {
            res.redirect('/');
        });
    } catch (err) {
        next(err);
    }
};

exports.postJob = async (req, res, next) => {
    const { title, jobTime, salary, location, description, contact } = req.body;
    try {
        if (!title || !jobTime || !location || !contact) return res.redirect('/post-job');
        const job = new JobDetail({
            title,
            jobTime,
            salary,
            location,
            description,
            contact,
            employer: req.session && req.session.user ? req.session.user._id : null,
        });
        await job.save();
        res.redirect('/jobs');
    } catch (err) {
        next(err);
    }
};

exports.getLogout = (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
};