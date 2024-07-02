# cartRabit

Brief description of your project.

## Dependencies

This project relies on the following Node.js packages:

- [axios](https://www.npmjs.com/package/axios): Version 1.5.1
- [bcrypt](https://www.npmjs.com/package/bcrypt): Version 5.1.1
- [cookie-parser](https://www.npmjs.com/package/cookie-parser): Version 1.4.6
- [cors](https://www.npmjs.com/package/cors): Version 2.8.5
- [dotenv](https://www.npmjs.com/package/dotenv): Version 16.3.1
- [express](https://www.npmjs.com/package/express): Version 4.18.2
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Version 9.0.2
- [mongodb](https://www.npmjs.com/package/mongodb): Version 6.1.0
- [mongoose](https://www.npmjs.com/package/mongoose): Version 7.5.3
- [nodemon](https://www.npmjs.com/package/nodemon): Version 3.0.1

## How to Run the Server

To run the server, you'll need Node.js installed on your machine. Follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone <repository-url>

2. Navigate to the project's directory:
   cd <project-directory>

3. Install project dependencies using npm:
    npm install

4. Create a .env file in the project's root directory and add the following environment variables:
    PASSWORD="TY8Lx3ug4XFAdJXm"
    DB_URL= "mongodb+srv://princeroy8606:TY8Lx3ug4XFAdJXm@cluster0.aiktyau.mongodb.net/?retryWrites=true&w=majority"
    SECRECT_KEY = "secure@123"

5. Start the server in development mode using the following command:
    npm run devStart

You can access the server at http://localhost:5000.


Routes
/auth: Route for authentication
/houses: Route for house-related operations
/booking: Route for booking-related operations
Sample Route
To check if the server is running, you can access the root route:

http://localhost:5000/
You should see a response indicating "Connection Successful."

if You are trying to host the Server in any platform 
