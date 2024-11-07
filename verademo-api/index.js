const express = require("express");
//const swaggerJsdoc = require("swagger-jsdoc");
//const swaggerUi = require("swagger-ui-express");

const app = express();
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users.routes");
const postsRoutes = require("./routes/posts.routes");
const adminRoutes = require("./routes/admin.routes");


/*

app.use(bodyParser.json());

// Swagger Initialization - START
const swaggerOption = {
  swaggerDefinition: (swaggerJsdoc.Options = {
    openapi: "3.0.0",
    info: {
      title: "Verdemo-API",
      description: "API documentation",
      contact: {
        name: "Developer",
      },
      servers: ["http://localhost:8000/"],
    },
  }),
  apis: ["index.js", "./routes/*.js"],
};

*/

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // Log information about the request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('---- Request Body:', req.body);
  }
  next();
});

app.use('/public', (req, res, next) => {
  // Log information about the static file request
  console.log(`[${new Date().toISOString()}] Static file: ${req.method} ${req.url}`);
  next();
});


//const swaggerDocs = swaggerJsdoc(swaggerOption);
//app.use("/public", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/public', express.static(__dirname + '/public'));
/** Swagger Initialization - END */






app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/admin", adminRoutes);

app.listen(8000, () => {
  console.log("Verademo API is ready to listen for requests");
});

const _zipObjectDeep = require('lodash/zipObjectDeep'),
zipObjectDeep = (props, values) => {
  return _zipObjectDeep(props, values);
}
