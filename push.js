// eslint-disable-next-line @typescript-eslint/no-require-imports
const { exec } = require("child_process");

const commitMessage = process.argv[2];

if (!commitMessage) {
  console.error("Error: Please provide a commit message.");
  console.log('Usage: node deploy.js "Your commit message"');
  process.exit(1);
}

exec(
  `git add . && git commit -m "${commitMessage}" && git push && npm run dev`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Output: ${stdout}`);
  }
);
