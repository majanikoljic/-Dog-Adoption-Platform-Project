const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  registerDog,
  adoptDog,
  removeDog,
  listMyDogs,
  listAdoptedDogs,
} = require('../controllers/dogController');

router.post('/', auth, registerDog);
router.post('/:id/adopt', auth, adoptDog);
router.delete('/:id', auth, removeDog);
router.get('/my-dogs', auth, listMyDogs);
router.get('/my-adopted-dogs', auth, listAdoptedDogs);

module.exports = router;
// This code defines the routes for dog-related operations in a Node.js application using Express.
// It includes routes for registering a dog, adopting a dog, removing a dog, listing the user's dogs, and listing the user's adopted dogs.
// The `auth` middleware is applied to protect these routes, ensuring that only authenticated users can access them.
// The routes are then exported for use in the main application file.
// The `registerDog` function handles the registration of a new dog, `adoptDog` handles the adoption process, `removeDog` allows users to remove their registered dogs,