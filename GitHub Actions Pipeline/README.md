# GitHub Actions Pipeline

A sample project demonstrating a GitHub Actions workflow that sets up a Node.js environment and logs a personalized "Hello from @username" message.

## Workflow

The active workflow is defined in the root `.github/workflows/main.yml` file. It triggers on push, pull request, or manual dispatch.

### Key Steps:
1.  **Checkout Code:** Clones the repository.
2.  **Setup Node.js:** Initializes a Node.js 18 environment.
3.  **Log Message:** Prints a greeting using the `github.actor` context variable (e.g., "Hello from @amukta14").
4.  **Display Info:** Shows the current Node.js and npm versions.

## How to Run
Push changes to the `main` branch or trigger the workflow manually from the **Actions** tab in your GitHub repository. The workflow located in the root `.github` directory is the one that will execute. 

<img width="1688" alt="Screenshot 2025-06-22 at 9 06 30 PM" src="https://github.com/user-attachments/assets/35b97ae1-2271-4857-95f4-cec41ddc0cd6" />
<img width="1665" alt="Screenshot 2025-06-22 at 9 06 16 PM" src="https://github.com/user-attachments/assets/1e958903-a5ef-4426-81cc-e6027f98c11c" />
