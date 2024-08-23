const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");

const app = express();
const port = 3001; // Use a different port if needed

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/deploy", (req, res) => {
  exec("/.local/bin/deploy.sh", (error, stdout, stderr) => {
    if (error) {
      console.error(`Deployment error: ${error.message}`);
      return res.status(500).send("Deployment failed");
    }

    if (stderr) {
      console.error(`Deployment stderr: ${stderr}`);
      return res.status(500).send("Deployment failed");
    }

    console.log(`Deployment stdout: ${stdout}`);
    res.send("Deployment successful");
  });
});

app.listen(port, () => {
  console.log(`Webhook listener running on port ${port}`);
});
