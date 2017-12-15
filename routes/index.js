var express   = require('express');
var router    = express.Router();

/**
 * @swagger
 * /apibase/ok:
 *   get:
 *     description: Method to verify that the API is running
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: version ok
 */
router.get('/ok', function(req, res, next) {
  res.status(200).send('version 0.0.1 ok!');
});

module.exports = router;