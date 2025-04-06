import MLR from "ml-regression-multivariate-linear";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//Ordered loosely from fast fashion to luxury brands
const brandMap = {
  "h&m": 1,
  "zara": 2,
  "uniqlo": 3,
  "gap": 4,
  "american eagle": 5,
  "adidas": 6,
  "nike": 7,
  "other": 8,
  "banana republic": 9,
  "tommy hilfiger": 10,
  "levi's": 11,
  "hermes": 12,
  "chanel": 13,
  "dior": 14,
  "louis vuitton": 15,
  "gucci": 16
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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath =  path.resolve(__dirname, 'trainingData.json');
const jsonData = fs.readFileSync(filePath, 'utf-8');
const dataArray = JSON.parse(jsonData);

//Add training data to inputs and outputs
for(const item of dataArray) {
  const brandValue = brandMap[item["brand"].toLowerCase()] || brandMap["other"];
  const categoryValue = categoryMap[item["category"].toLowerCase()] || categoryMap["other"];
  const originalPrice = item["original_price"];
  const resalePrice = item["resale_price"];
  inputs.push([brandValue, categoryValue, originalPrice]);
  outputs.push([resalePrice])
}

//Train model
const regression = new MLR(inputs, outputs);

//Function to estimate resale price
const MIN_RESALE_PRICE = 5.0;
export default function estimateResalePrice(brand, category, originalPrice) {
  //Maps brand and category to corresponding values
  const brandValue = brandMap[brand.trim().toLowerCase()] || brandMap["other"];
  const categoryValue = categoryMap[category.trim().toLowerCase()] || categoryMap["other"];
  //Predict price
  const [estimate] = regression.predict([brandValue, categoryValue, originalPrice]);
  console.log(brandValue, categoryValue, originalPrice, estimate)
  
  if(estimate < MIN_RESALE_PRICE) {
    return MIN_RESALE_PRICE;
  }
  return Math.round(estimate * 100) / 100; // Round to 2 decimal places
}
