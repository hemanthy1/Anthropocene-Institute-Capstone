# cse498-anthropocene-institute

## Name
Optimized Carbon Dioxide Removal - Anthropocene Institute

## Contributors
Jack Holscher - holsche2@msu.edu

Hemanth Yalamanchili - hemanthy@gmail.com

Edie Haase - haaseede@msu.edu

Ishita Kokil - kokilish@msu.edu

Nick Wang - wangnich@msu.edu

## Description
As apart of our senior capstone project at Michigan State University, we teamed up with the [Anthropocene Institute](https://anthropoceneinstitute.com) and set out to create a machine learning model that analyzes factors related to methods of removing carbon dioxide from the Earth's atmosphere. The end goal and essence of the project is optimizing the location and cost of future projects within the field of carbon sequestration and environmental sustainability as a whole, all displayed in a user-friendly web application.

## How to Use 

- Database Startup (necessary for any map content):
    - In the Google Cloud Platform, log into TeamAnthro
    - Make sure you are in the "CarbonMapp" Project (To the right of the Google Cloud logo)
    - Navigate to the "SQL" page in the nav bar on the left
    - Run the "Carbon Mapp" instance

- Running Locally:
    - Run the backend by running the app.py script in the "backend" directory
    - Navigate to the frontend directory -> src -> components
    - In the KelpMap -> KelpMap.js, replace all occurrences of the url with url of the running backend (commented "CHANGE" next to it, to help find it easier)
    - Do the same for DACMap -> DACMap.js and ReforestationMap -> ReforestationMap.js
    - Navigate back to the root "frontend" directory
    - Run "npm install" to update packages
    - Run "npm start" to run the frontend

- Running on the Cloud:
    - Install the GCloud CLI from here: https://cloud.google.com/sdk/docs/install
    - Authenticate it by running "gcloud init"
    - This should open a web browser prompting to sign into a google account (sign into the TeamAnthro account)
    - Navigate to the "kubernetes" directory
    - Run "gcloud container clusters get-credentials dev-site --region us-central1 --project carbon-mapp"
    - Run "kubectl apply -f backend-deployment.yaml" and "kubectl apply -f backend-service.yaml"
    - In the Google Cloud Platform, navigate to the "Kubernetes Engine" page in the navbar
    - Go to "Workloads" and wait for application to start up
    - Go to "Services and Ingress" in the sidebar and copy the url from the "Endpoints" section
    - Update the url in Kelpmap.js, DACMap.js, and ReforestationMap.js to use that url (see "Running Locally" section to find their directory)
    - Have Docker, the application, running (should not do anything)
    - Navigate to the root "frontend" directory
    - Run "docker buildx create --use --name mybuilder" 
    - Run "docker buildx build --platform linux/amd64,linux/arm64 -t gcr.io/carbon-mapp/dev-react-app:latest . --push" 
    - Navigate to the "kubernetes" directory
    - Run "kubectl apply -f frontend-deployment.yaml" and "kubectl apply -f frontend-service.yaml"
    - After giving time to get the app running (make sure by going to the "Workloads" page in Google Cloud), go to "Services and Ingress" in Google Cloud and click on the endpoint for the "react-frontend-service"

Notes:
    - "docker buildx create --use --name mybuilder" is necessary to containerize to AMD64 from any other architecture
    - "docker buildx build --platform linux/amd64,linux/arm64 -t gcr.io/carbon-mapp/dev-react-app:latest . --push" creates a new container and pushes it to Google Cloud "dev-react-app" repository. The same *can* be done by going to the backend directory and running the same command with "dev-flask-app" instead
    - "kubectl apply -f backend-deployment.yaml" Deploys the respective container to the kubernetes node and the "service" command opens up an ingress to access it


## Authors and acknowledgment
Special thanks to our wonderful project sponsors from Anthropocene:

Melinda Chow Alankar - Director of Investment and Funding Opportunities

Frank Hiroshi Ling, PhD - Chief Scientist

Carl Page - President

Mike Villena - Software Engineer Manager

Joanna Reyes - UI/UX/Art Director

## License
&copy; Anthropocene Institute, All Rights Reserved

## Project status
The project is currently in the early stages of beta development.
