const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req,res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err))
    },

    getSingleThought(req,res) {
        Thought.findOne({ _id: req.params.thoughtId})
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No such thought' })
                : res.json(thought))
        .catch((err) => res.status(500).json(err))
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: thought._id } },
                { new: true } //displays newly edited entry in Insomnia
            );
        })
        .then((user) => 
            !user
                ? res.status(404).json( { message: 'Thought created, but no user found with that ID '})
                : res.json('Thought created!'))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)
        })
    },

    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No Thought found with that ID'})
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId }},
                        { new: true }
                    ))
            .then((user) => 
                !user
                    ? res.status(404).json( { message: 'thought deleted but not user found with this ID'})
                    : res.json({ message: 'Thought successfully deleted! '}))
            .catch((err) => res.status(500).json(err))
    }, 

    updateThought(req,res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: { "thoughtText": req.body.thoughtText } })
            .then((thought) => 
                !thought
                ? res.status(404).json({ message: 'Thought not found'})
                : res.status(200).json({ message: 'Success!!'})
                )
            .catch((err) => res.status(500).json(err))
    },

    createRxn(req,res) {
        Thought.findOneAndUpdate( { _id: req.params.thoughtId }, { $addtoSet: {
            reactions: req.body.reactionBody, username: req.body.username
        }})
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'Thought not found'})
                : res.status(200).json({ message: 'Success!!'})
                )
            .catch((err) => res.status(500).json(err)
            )
    },

    deleteRxn(req,res) {

    }
}