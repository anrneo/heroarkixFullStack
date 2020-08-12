const { Router } = require('express');
const router = Router();

const { getUsers,createUser, deleteUser } = require('../controllers/users.controller');

router.route('/')
    .post(createUser);

router.route('/login')
    .post(getUsers)

router.route('/:id')
    .delete(deleteUser);

module.exports = router;
