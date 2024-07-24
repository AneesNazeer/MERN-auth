# MERN Authentication App

## Overview

This application demonstrates a full-stack authentication system using the MERN stack (MongoDB, Express, React, Node.js). 

- **Frontend**: Built with React, utilizing React Query for efficient data fetching and state management.
- **Backend**: Developed with Node.js and Express, featuring Swagger for comprehensive API documentation.

## Setup Instructions

### Environment Variables

To configure the backend server, create a `.env` file in the `server` folder with the following content:

```env
PORT=5000
MONGO_URI=YOUR_MONGO_URI
JWT_SECRET=YOUR_JWT_SECRET
JWT_REFRESH_SECRET=YOUR_JWT_REFRESH_SECRET
ACCESS_TOKEN_LIFE=15m
REFRESH_TOKEN_LIFE=7d
```

## Running the Application

### Start the Backend Server

Navigate to the `server` directory and run:

```bash
cd server
npm install
npm start
```

The backend server will start on port `5000`.

### Start the Frontend Client

Open a new terminal window or tab, navigate to the client directory, and run:

```bash
cd client
npm install
npm start
```

The frontend application will open in your default browser, typically at `http://localhost:3000`.

### Accessing Swagger Documentation
You can view the API documentation by visiting:

`http://localhost:5000/api-docs/`

## Additional Notes

- Ensure that MongoDB is running and accessible using the MONGO_URI provided.
- Adjust the JWT_SECRET and JWT_REFRESH_SECRET to secure your tokens appropriately.
- The ACCESS_TOKEN_LIFE and REFRESH_TOKEN_LIFE settings define the lifespan of your JWT tokens.
- For production deployment, make sure to configure environment variables securely and optimize your application.

## Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request with your changes. Ensure that you follow the coding standards and include tests for any new features.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
For any questions or issues, please contact Me @`mailtosabarivr@gmail.com`.

