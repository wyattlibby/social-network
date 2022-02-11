const router = require('express').Router();

const { 
    getThoughts, 
    getThoughtsById, 
    createThoughts, 
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction

} = require('../../controllers/thoughts_controller');

// router.route('/').get(getAllThoughts);

router.route('/').get(getThoughts).post(createThoughts);

router.route('/:id').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts); 

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;