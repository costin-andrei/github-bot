import { Probot } from 'probot'; // Import the Probot library

export default function appFunction(app) {
  // Register your app's main event handlers here
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

  // Additional event handlers or logic can be added here

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}

// This code is executed when the Probot app is started
export const probotApp = new Probot({
  // Add any additional options or configuration here
});

probotApp.load(appFunction); // Load your main app function into the Probot instance
