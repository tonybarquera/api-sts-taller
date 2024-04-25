const swaggerUi = require("swagger-ui-express");
const fs = require('fs');
const YAML = require('yaml');

const file = fs.readFileSync('./docs/v1/docs.yml', 'utf-8');
const swaggerDocument = YAML.parse(file);

// Function to setup our docs
const swaggerDocs = (app, port) => {
  // Route-Handler to visit our docs
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  // Make our docs in JSON format available
  
  // app.get("/api/v1/docs.json", (req, res) => {
  //   res.setHeader("Content-Type", "application/json");
  //   res.send(swaggerSpec);
  // });

  console.log(
    `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
  );
};

module.exports = { swaggerDocs };