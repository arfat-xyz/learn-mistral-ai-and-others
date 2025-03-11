// eslint-disable-next-line @typescript-eslint/no-require-imports
const { exec } = require("child_process");

const commitMessage = process.argv[2];

if (!commitMessage) {
  console.error("Error: Please provide a commit message.");
  console.log('Usage: node deploy.js "Your commit message"');
  process.exit(1);
}

// First execute git commands
exec(
  `git add . && git commit -m "${commitMessage}" && git push`,
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

    // Now execute npm run dev and capture its output
    const devProcess = exec("npm run dev");

    devProcess.stdout.on("data", (data) => {
      console.log(`Server Output: ${data}`);
    });

    devProcess.stderr.on("data", (data) => {
      console.error(`Server Error: ${data}`);
    });

    devProcess.on("close", (code) => {
      console.log(`Server process exited with code ${code}`);
    });
  }
);
