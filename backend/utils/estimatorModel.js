import MLR from "ml-regression-multivariate-linear";
import fs from 'fs';

//Ordered loosely from fast fashion to luxury brands
const brandMap = {
  "H&M": 1,
  "Zara": 2,
  "Uniqlo": 3,
  "Gap": 4,
  "American Eagle": 5,
  "Adidas": 6,
  "Nike": 7,
  "other": 8,
  "Banana Republic": 9,
  "Tommy Hilfiger": 10,
  "Levi's": 11,
  "Hermes": 12,
  "Chanel": 13,
  "Dior": 14,
  "Louis Vuitton": 15,
  "Gucci": 16
};

//Ordered loosely from top clothing to bottom clothing
const categoryMap = {
  "shirts": 1,
  "sweaters": 2,
  "jackets": 3,
  "dresses": 4,
  "pants": 5,
  "shoes": 6,
  "other": 7
};

//Inputs: [brand, category, original price]
const inputs = [];

//Outputs: [estimated price]
const outputs = [];

//Read training data from JSON file
const filePath = './trainingData.json';
const jsonData = fs.readFileSync(filePath, 'utf-8');
const dataArray = JSON.parse(jsonData);
console.log(dataArray.length);

//Add training data to inputs and outputs
for(const item of dataArray) {
  const brandValue = brandMap[item["brand"]] || brandMap["other"];
  const categoryValue = categoryMap[item["category"]] || categoryMap["other"];
  const originalPrice = item["original_price"];
  const resalePrice = item["resale_price"];
  inputs.push([brandValue, categoryValue, originalPrice]);
  outputs.push([resalePrice])
}

//Train model
const regression = new MLR(inputs, outputs);

//Function to estimate resale price
export default function estimateResalePrice(brand, category, originalPrice) {
  //Maps brand and category to corresponding values
  const brandValue = brandMap[brand] || brandMap["other"];
  const categoryValue = categoryMap[category] || categoryMap["other"];
  //Predict price
  const estimate = regression.predict([brandValue, categoryValue, originalPrice]);
  return Math.round(estimate * 100) / 100; // Round to 2 decimal places
}
