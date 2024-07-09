require("dotenv").config();
const express = require("express");
const next = require("next");
const morgan = require("morgan");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Use middleware
  server.use(morgan("dev"));

  // Custom route example
  server.get("/p/:id", (req, res) => {
    const actualPage = "/post";
    const queryParams = { id: req.params.id };
    app.render(req, res, actualPage, queryParams);
  });

  // Custom API route
  server.get("/api/custom", (req, res) => {
    res.json({ message: "This is a custom API endpoint" });
  });

  // Default route handler
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
