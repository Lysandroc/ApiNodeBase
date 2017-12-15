# Node Base
Project with the purpose of serving as a basis for the creation of new api's in node and mssql.

## Directory structure
```
    bin/
        www
    connection/
        conn.js
    README.md
    node_modules/
    public/
    repository/
        base.js
        userRepository.js
    routes/
        index.js
        users.js
    util.js        
    views/
        error.jade
        index.jade
        layout.jade
    app.js
    configDatabase-DEV.js
    configDatabase-PROD.js
    package.json
```

## To start development:
```
    npm install
```

```
    npm start
```

## Documentation with Swagger
So that the documentation is automatically updated, you must follow the swagger UI pattern in the controller methods as an example:

```
/**
 * @swagger
 * /apibase/ok:
 *   get:
 *     description: Method to verify that the API is running
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: versão ok
 */
```