const { Probot } = require('probot');
const { createAppAuth } = require('@octokit/auth-app');
require('dotenv').config(); // Load environment variables from .env file

// Define the port you want to use
const PORT = process.env.PORT || 8080;

module.exports = (app) => {
  app.log.info("Yay, the app was loaded!");

  // Event handler for when an issue is opened
  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    return context.octokit.issues.createComment(issueComment);
  });

  // Event handler for when a pull request is opened
  app.on("pull_request.opened", async (context) => {
    const pullRequestComment = context.issue({
      body: "Thanks for opening this pull request!",
    });
    return context.octokit.issues.createComment(pullRequestComment);
  });
};

// Authenticate as a GitHub App using the private key
const auth = createAppAuth({
  appId: process.env.APP_ID,
  privateKey: process.env.PRIVATE_KEY,
});

// Create a new Probot instance with the authentication
const probot = new Probot({
  auth: auth,
});

// Load your main app function into the Probot instance
probot.load(module.exports);

// Start the Probot application and listen for incoming HTTP requests
probot.start(PORT, () => {
  console.log(`Probot app is running on port ${PORT}`);
});