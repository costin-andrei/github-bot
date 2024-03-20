/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
export default (app) => {
  app.log.info("Yay, the app was loaded!");

  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    return context.octokit.issues.createComment(issueComment);
  });

  app.on("pull_request.opened", async (context) => {
    const pullRequestComment = context.issue({
      body: "Thanks for opening this pull request!",
    });
    return context.octokit.issues.createComment(pullRequestComment);
  });
};
