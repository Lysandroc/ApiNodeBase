var express           = require('express');
var router            = express.Router();
var userRepository    = require('../repository/userRepository');

/**
 * @swagger
 * /apibase/users/{id}:
 *   get:
 *     description: Method to return the name by id
 *     parameters:
 *       -  name: id
 *          in: path
 *          description: id of user
 *          required: true
 *          type: "integer"
 *          format: "int64"
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: id-> int name-> string
 */
router.get('/:id', function(req, res, next) {
  try {
    let matricula = req.param('id');
    let retorno = userRepository.getUserById(matricula);

    retorno.then(myTableRows => {      
      res.status(200).send(myTableRows);
    }).catch(function(error) {
      res.status(500).send('An unexpected error occurred: ' + JSON.stringify(error.parent.message));
    })
    }catch (error) {
      res.status(500).send('An error occurred with the following message: ' + JSON.stringify(error.message));
    }  
});

module.exports = router;