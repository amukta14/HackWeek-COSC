# GitHub Actions Pipeline

This project demonstrates a basic GitHub Actions workflow that sets up a Node.js environment and logs a personalized message.

## Workflow Overview

The workflow is located at `.github/workflows/main.yml` and performs the following tasks:

1. **Triggers**: Runs on push to main/master branch, pull requests, and manual dispatch
2. **Environment**: Sets up Ubuntu latest with Node.js 18
3. **Steps**:
   - Checkout code from repository
   - Set up Node.js environment with npm caching
   - Install dependencies (if package.json exists)
   - Log hello message with GitHub username
   - Display Node.js and npm versions

## Key Features

- **Node.js Setup**: Uses `actions/setup-node@v4` with Node.js 18
- **Caching**: Enables npm cache for faster builds
- **Conditional Dependencies**: Only installs npm packages if package.json exists
- **Personalized Message**: Logs "Hello from @username" using GitHub context
- **Additional Info**: Shows repository, branch, commit, and version information

## Workflow Triggers

The workflow will run automatically when:
- Code is pushed to `main` or `master` branch
- Pull requests are created against `main` or `master` branch
- Manually triggered via GitHub Actions UI

## GitHub Context Variables Used

- `github.actor` - The username of the person who triggered the workflow
- `github.repository` - The repository name (owner/repo)
- `github.ref_name` - The branch name
- `github.sha` - The commit SHA

## Files

- `.github/workflows/main.yml` - The main workflow file
- `README.md` - This documentation file

## Usage

1. Push this folder to your GitHub repository
2. Navigate to the "Actions" tab in your repository
3. The workflow will run automatically on pushes
4. You can also manually trigger it using the "workflow_dispatch" trigger

## Example Output

When the workflow runs, you'll see output similar to:
```
Hello from @your-github-username
Repository: owner/repository-name
Branch: main
Commit: abc123def456...
Node.js version: v18.x.x
npm version: 9.x.x
``` 