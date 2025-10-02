
  # Globetrotter App

  This is a code bundle for Globetrotter App. The original project is available at https://www.figma.com/design/kWNMpjZfKE7fZAcaME2WRx/Globetrotter-App.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
  ## Deploying to Azure Static Web Apps using GitHub Actions

  This repository includes a GitHub Actions workflow at `.github/workflows/azure-static-web-apps.yml` that will build and deploy the app to Azure Static Web Apps on pushes to `main`.

  Steps to configure deployment:

  1. In the Azure Portal create a new Static Web App (or use the Azure CLI). Choose the repository and the branch (e.g. `main`) or create it without linking if you prefer to provide a deployment token.
  2. If you created the Static Web App via the portal and linked the repo, Azure might create the GitHub Action for you. If not, create a new GitHub secret named `AZURE_STATIC_WEB_APPS_API_TOKEN` with the deployment token from the Static Web App.
  3. Push your code to the `main` branch. The workflow will run, build the app (`npm run build`) and deploy the contents of the `dist` folder.

  Notes:
  - The workflow assumes the production build output is placed under `dist`. If your build outputs somewhere else, update `output_location` in the workflow file.
  - You can trigger the workflow manually from the Actions tab in GitHub using `workflow_dispatch`.

  Deploying to Azure App Service (Web App)
  --------------------------------------

  If you prefer to host on Azure App Service (Web App) instead of Azure Static Web Apps, you can use the `azure/webapps-deploy` GitHub Action to deploy the production build.

  Steps:

  1. In the Azure Portal, create an App Service (Linux or Windows) and choose a runtime stack compatible with Node.js or use a static site by setting up a simple static server (e.g., `serve`) in the startup command.
  2. In the App Service resource, go to "Get publish profile" and download the publish profile XML.
  3. In your GitHub repository settings → Secrets → Actions, add two secrets:
    - `AZURE_WEBAPP_NAME` — the name of your App Service (or the resource name used by the action).
    - `AZURE_WEBAPP_PUBLISH_PROFILE` — the entire contents of the publish profile XML file.
  4. Push to the `main` branch; the workflow `.github/workflows/azure-webapp-deploy.yml` will build the app and deploy the `dist` folder to the Web App.

  Notes and tips:
  - If your App Service expects a Node server (rather than static files), add a small server (e.g., using `serve` or an Express app) under `server/` and update the workflow and App Service startup command accordingly.
  - Make sure the App Service's Node version matches the one used to build the app (Node 18 in the workflow by default).
  