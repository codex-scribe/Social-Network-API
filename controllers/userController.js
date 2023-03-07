const { User } = require('../models');

module.exports = {
    getUsers(req,res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req,res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID found' })
                : res.json(user))
                .catch((err) => res.status(500).json(err))
    },
    createUser(req,res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))

    },
    updateUser(req,res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $set: { username: req.body.username } })
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))
    },
    deleteUser(req,res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => 
            !user
                ? res.status(404).json({ message: 'No User with that ID found' })
                : res.status(200).json({ message: 'Success!!' }))
            .then(() => res.json({ message: 'User account deleted '}))
            .catch((err) => res.status(500).json(err))
    }
}
