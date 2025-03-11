// eslint-disable-next-line @typescript-eslint/no-require-imports
const { exec } = require("child_process");

const commitMessage = process.argv[2];

if (!commitMessage) {
  console.error("Error: Please provide a commit message.");
  console.log('Usage: node push.js "Your commit message"');
  process.exit(1);
}

// Function to execute commands and handle their output
const executeCommand = (command, successMessage, isPushCommand = false) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }

      // If it's a git push, handle stderr as a success message
      if (isPushCommand && stderr && stderr.includes("main -> main")) {
        console.log(`Git Push Success: ${stderr}`);
        resolve(stdout);
        return;
      }

      // Handle other stderr as an error
      if (stderr) {
        reject(`Stderr: ${stderr}`);
        return;
      }

      if (stdout) {
        console.log(successMessage, stdout);
      }
      resolve(stdout);
    });
  });
};

// Execute git add
executeCommand("git add .", "Files added successfully:")
  .then(() => {
    // Execute git commit
    return executeCommand(
      `git commit -m "${commitMessage}"`,
      "Commit message added:"
    );
  })
  .then((commitOutput) => {
    // Commit output example: main 0964973 add dynamic code 4
    console.log("Commit Output:", commitOutput);

    // Execute git push
    return executeCommand(
      "git push",
      "Push to remote repository successful:",
      true
    );
  })
  .then((pushOutput) => {
    // Push output example: de502e1..0964973  main -> main
    console.log("Push Output:", pushOutput);

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
  })
  .catch((error) => {
    console.error(error);
  });
