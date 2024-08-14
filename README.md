# eCommerce Website

## Overview

This is a simple eCommerce website built with HTML, CSS, and JavaScript for the front end, while Node.js and MySQL are used for the backend and database management. The project aims to demonstrate and practice skills in web development, including styling, JavaScript functionalities, backend development, and database management.

## Technologies Used

- **Frontend:**
  - HTML
  - CSS
  - JavaScript

- **Backend:**
  - Node.js
  - Express.js

- **Database:**
  - MySQL

## Project Goals

- **Styling:** Practice designing and styling a website using HTML and CSS.
- **Functionality:** Implement interactive features and dynamic content using JavaScript.
- **Backend Development:** Learn how to handle backend operations using Node.js and Express.js.
- **Database Management:** Apply theoretical knowledge about databases and manage data using MySQL.

## Getting Started

Follow these steps to set up and run the eCommerce website locally:

### 1. **Install Node.js**

Download and install Node.js from the official website: [Node.js](https://nodejs.org/). Node.js includes `npm` (Node Package Manager) which is required for managing project dependencies.

### 2. **Install MySQL**

Download and install MySQL from the official website: [MySQL](https://dev.mysql.com/downloads/). Ensure you have MySQL server running and set up a database for the project.

### 3. **Clone the Repository**

Clone this repository to your local machine using Git:

```bash
git clone https://github.com/yourusername/your-repository-name.git
cd your-repository-name
```

### 4. **Install Dependencies**
Navigate to the project directory and install the required Node.js dependencies:

```bash
npm install
```

### 5. **Set Up the Database**
Create the Database:

Log in to MySQL and create a new database for the project:

```sql

CREATE DATABASE ecommerce;
```
Create the Tables:

Create the necessary table in the database. You can copy this query:

```sql
USE ecommerce;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

### 6. **Configure the Environment**
Set up your environment variables for database connection and other configuration options. Create a .env file in the project root with the following content:

```env
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=ecommerce
```

### 7. **Start the Server**
Run the Node.js server to start the application:

```bash
node server.js
```
The server will be running on http://localhost:3000 by default. Open this URL in your web browser to view the website.

## Usage
- **User Registration**: Users can register with their username and password.
- **Login**: Registered users can log in with their username and password.
- **Product Management**: View and interact with products listed in the store.


Thank you for checking out this project!
