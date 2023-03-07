const router = require('express').Router();
const {
    getThoughts,
    createThought,
    getSingleThought,
    updateThought,
    deleteThought,
    createRxn,
    deleteRxn
} = require('../../controllers/thoughtController')

//localhost:3001/api/thoughts -->
router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(createRxn).delete(deleteRxn)

module.exports = router;