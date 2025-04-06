# Resale Price Estimator

A web application that estimates the resale price of clothing based on brand, category, and original price using a simple machine learning model.

## Details
 **Backend:** 
- The backend contains an API endpoint that receives clothing item data.
- A machine learning model is used to estimate the resale price for that item based on its brand, category, and original price.
- When the estimated resale price is calculated, it will return the result to the user and store it inside a database.

**ML Model**:
- A machine learning model is used to estimate the resale price.
- The algorithm currently used is multivariate linear regression.
- The model is trained with over 200 data entries (see [`backend/utils/trainingData.json`](https://github.com/Jiatao7/Resale-Price-Estimator/blob/master/backend/utils/trainingData.json)).

**Frontend**:
- Allows the user to input brand, category, and original price and displays the estimated resale price after submission.
- Displays error messages if user input is invalid.

## Technologies
- **Frontend:** React
- **Backend:** Node and Express
- **Database:** MySQL
- **ML Model:** [`ml-regression-multivariate-linear`](https://www.npmjs.com/package/ml-regression-multivariate-linear)









