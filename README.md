# Introduction

**Intentify** is a website developed for Brave's Web-scraping for Visitor Classification Mini-challenge, combining both AI and webscraping to classify users based on their inputted URL.
Additionally, Intentify allows users to search for related webpages to their URL, helping users find what they are looking for and enhancing Intentify's predictions.
By analyzing the contents of a user's URLs, Intentify is able to predict a user's occupation and intentions by the end of their conversation.

## Tech-stack
Below is a list of technologies used to create Intentify. Required technologies for the Brave Mini-challenge are bolded.

### Frontend
- **React**
- **Redux**
- Next.js

### Backend + Cloud
- **Python** (specifically, Python3)
- **Flask**
- **AWS**
- Supabase

### Other Techologies
- Botpress
- Jina.ai
- Nextra

## Developing Locally - Getting started
First, clone the git repository. Before running the web application, you'll need to
set up a few services and environment variables.

### Environment Variables
Intentify's frontend and backend both require environment variables that need to be set
in a .env file.

#### Frontend (src)
- **NEXT_PUBLIC_API_BASE_URL**: The location of the Flask server. Set this to http://localhost:4000

#### Backend
- **SECRET_KEY**: A randomly generated secret key for encryption
- **DATABASE_URL**: The location of the database. In my presentation, this is set to my database hosted by 
AWS. However, for local development, set this to http://127.0.0.1:5432.

### Scripts

Inside, there are four scripts that help you with this web application's lifecycle.
Note: Ensure you have Docker and Python's venv module installed.

### setup.sh
Sets up and activates the virtual environment "venv" to install the required dependencies
for the backend.

### setup_docker.sh
Removes any existing docker containers and volumes. Thereafter, the script installs
the necessary frontend dependencies in the virtual environment and rebuilds the web
application's containers.<br/><br/>
The web application depends on three services:
- db - A PostgreSQL database that runs on port 5432
- flaskapp - The Flask backend of the web application, running on port 4000
- nextapp - The Next.JS frontend of the web application, running on port 3000

### run.sh
Runs the web application, utilizing the virtual environment.

### shutdown.sh
Stops all running docker containers.

---
In general, start Intentify by running (in order), setup.sh, setup_docker.sh, and run.sh.
Once done, run shutdown.sh to stop all running services. You don't have to set
the application back up after you stop it; just run run.sh to start it back up.

## Contact
You can reach out by emailing me at lanzangeles100@gmail.com. You can also go and visit my website at https://lanzangeles.netlify.app/!