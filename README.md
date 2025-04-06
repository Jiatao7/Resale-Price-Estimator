# Resale Price Estimator

A web application that estimates the resale price of clothing based on brand, category, and original price using a simple machine learning model.

Feel free to try out the project at: https://jiatao-resale-price-estimator.vercel.app/

A demo of this project is also available here: https://drive.google.com/file/d/1Nzgwx564BxHVQ8KARbRdOhwgj-9GalCB/view?usp=sharing

## Technologies
- **Frontend:** React
- **Backend:** Node and Express
- **Database:** MySQL
- **ML Model:** [`ml-regression-multivariate-linear`](https://www.npmjs.com/package/ml-regression-multivariate-linear)

## Details
 **Backend:** 
- The backend contains an API endpoint that receives clothing item data.
- A machine learning model is used to estimate the resale price for that item based on its brand, category, and original price.
- When the estimated resale price is calculated, it will return the result to the user and store it inside a database.

**ML Model**:
- To estimate the resale price, a machine learning model is used.
- The algorithm currently used is multivariate linear regression.
- The model is trained with over 200 data entries (see [`backend/utils/trainingData.json`](https://github.com/Jiatao7/Resale-Price-Estimator/blob/master/backend/utils/trainingData.json)).

**Frontend**:
- Allows the user to input brand, category, and original price and displays the estimated resale price after submission.
- Displays error messages if user input is invalid.

## Setup
These are the setup instructions for running the application locally.
### 1. Clone the repository
```
git clone https://github.com/Jiatao7/Resale-Price-Estimator.git
cd Resale-Price-Estimator
```

### 2. Create a MySQL Database
Make sure MySQL is installed on your system.

Log into the MySQL shell:
```
mysql -u root -p
```
Create a new database:
```
CREATE DATABASE resale_estimator;
USE resale_estimator;
```

Create the estimates table:
```
CREATE TABLE estimates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL, 
    original_price DECIMAL(10, 2) NOT NULL CHECK (original_price > 0),
    estimated_price DECIMAL(10, 2) NOT NULL CHECK (estimated_price > 0)
);
```

### 3. Configure Environment Variables
Create a .env file inside of the backend directory.
Then store your database information inside:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=<enter your password>
DB_DATABASE=resale_estimator
```

### 4. Install dependencies
Install backend dependencies:
```
cd backend
npm install
```
Install frontend dependences:
```
cd ../frontend
npm install
```

### 5. Adjust fetch URL in frontend
To connect the frontend to your backend API, go to your [`frontend/src/components/form.js`](https://github.com/Jiatao7/Resale-Price-Estimator/blob/master/frontend/src/components/form.js) and update the fetch URL.

Change this line (used for deployment):
```
fetch(`https://${process.env.REACT_APP_API_URL}/api/estimates/new`)
```
To this (used for running locally):
```
fetch("http://localhost:4000/api/estimates/new")
```

### 6. Run the app
Start the backend:
```
cd backend
npm start
```
In a new terminal, start the frontend:
```
cd frontend
npm start
```

### 7. View the app
Open http://localhost:3000 in your browser to use the application.
