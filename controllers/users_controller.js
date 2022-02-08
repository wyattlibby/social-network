const {Users} = require('../models');

const usersController = {
    
    // Create a new User
    createUsers(req, res) {
        Users.create(req.body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => res.status(400).json(err));
    },

    // Get All Users
    getAllUsers(req, res) {
        Users.find({})
        // populate users thoughts
        .populate({path: 'thoughts', select: '-__v'})
        // populate user friends
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        // .sort({_id: -1})
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Get single user by ID
    getUsersById(req, res) {
        Users.findOne({_id: req.params.id })
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        // return if no user is found 
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No User with this ID'});
                return; 
            }
            res.json(dbUsersData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    // Update a current User by ID
    updateUsers(req, res) {
        Users.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No User with this ID'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },

    deleteUsers(req, res) {
        Users.findOneAndDelete({_id: req.params.id})
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No User with this ID'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));
    },

    // Delete a current user by ID
    addFriend(req, res) {
        Users.findOneAndUpdate({_id: req.params.id}, {$push: { friends: req.params.friendId}}, {new: true})
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(dbUsersData => {
            if (!dbUsersData) {
                res.status(404).json({message: 'No User with this ID'});
                return;
            }
        res.json(dbUsersData);
        })
        .catch(err => res.json(err));
    },

    // Delete a current Friend
    deleteFriend(req, res) {
        Users.findOneAndUpdate({_id: req.params.id}, {$pull: { friends: req.params.friendId}}, {new: true})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No User with this ID'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));
    }

};


module.exports = usersController; 