const Dog = require('../models/Dog');

exports.registerDog = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Dog name is required' });

    const dog = new Dog({
      name,
      description,
      owner: req.user.id,
    });

    await dog.save();
    res.status(201).json(dog);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.adoptDog = async (req, res) => {
  try {
    const dogId = req.params.id;
    const { thankYouMessage } = req.body;
    const userId = req.user.id;

    const dog = await Dog.findById(dogId);

    if (!dog) return res.status(404).json({ error: 'Dog not found' });
    if (dog.status === 'adopted') return res.status(400).json({ error: 'Dog already adopted' });
    if (dog.owner.toString() === userId) return res.status(400).json({ error: 'You cannot adopt your own dog' });

    dog.status = 'adopted';
    dog.adoptedBy = userId;
    dog.thankYouMessage = thankYouMessage || '';

    await dog.save();

    res.json(dog);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.removeDog = async (req, res) => {
  try {
    const dogId = req.params.id;
    const userId = req.user.id;

    const dog = await Dog.findById(dogId);
    if (!dog) return res.status(404).json({ error: 'Dog not found' });
    if (dog.owner.toString() !== userId)
      return res.status(403).json({ error: 'You can only remove dogs you registered' });
    if (dog.status === 'adopted')
      return res.status(400).json({ error: 'Cannot remove a dog that has been adopted' });

    await dog.remove();

    res.json({ message: 'Dog removed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.listMyDogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, page = 1, limit = 10 } = req.query;

    const query = { owner: userId };
    if (status) query.status = status;

    const dogs = await Dog.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Dog.countDocuments(query);

    res.json({
      page: Number(page),
      limit: Number(limit),
      total,
      dogs,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.listAdoptedDogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const query = { adoptedBy: userId };

    const dogs = await Dog.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Dog.countDocuments(query);

    res.json({
      page: Number(page),
      limit: Number(limit),
      total,
      dogs,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
// This code defines the dog-related operations in a Node.js application using Express.
// It includes functions to register a new dog, adopt a dog, remove a dog, list the user's registered dogs, and list the user's adopted dogs.
// Each function handles errors and responds with appropriate status codes and messages.
// The `registerDog` function creates a new dog entry, `adoptDog` allows a user to adopt a dog, `removeDog` enables users to remove their registered dogs,
// `listMyDogs` retrieves the user's registered dogs with optional filtering by status, and `listAdoptedDogs` retrieves the user's adopted dogs.
// The functions use Mongoose to interact with the MongoDB database, ensuring that only authenticated users can perform these operations through the `auth` middleware.
// The `Dog` model is used to define the structure of the dog documents in the database,
// which includes fields for the dog's name, description, status, owner, adoptedBy, and thankYouMessage.
