Accubit
# Express RabbitMQ and File Upload Project
This project demonstrates how to integrate RabbitMQ with Express.js, handle file uploads using Multer, and perform basic API routing.
## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/express-rabbitmq-upload.git
2. Install the dependecies:
   ```bash
   npm install
3. Start the server:
   ```bash
   node app.js
## Features
**File Upload**: Upload files to the uploads/ directory using Multer.
**RabbitMQ Messaging**: Connect and consume messages from RabbitMQ queues.
**API Routing**: Handle user-related requests with validation.
## API Endpoints
- **POST /users**: Add a new user with validation.
- **POST /msg**: Upload files and send messages.
## Usage
1. **File Upload**:
Upload files via the /msg endpoint using form-data.
2. **RabbitMQ**:
Messages are consumed and logged from the RabbitMQ queue.
3. **Testing**:
Use Postman or any API testing tool to test file uploads and user creation.
Verify RabbitMQ messages in the console logs.
## Conclusion
This project showcases how to build a basic Node.js application with messaging and file handling capabilities using RabbitMQ and Multer.
