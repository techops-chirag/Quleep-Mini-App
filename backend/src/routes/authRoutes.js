const router = require('express').Router();
const { login, register, getMe } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', login);
router.post('/register', register);
router.get('/me', authMiddleware, getMe);

module.exports = router;
