import MLR from "ml-regression-multivariate-linear";

//Ordered loosely from fast fashion to luxury brands
const brandMap = {
  "H&M": 0,
  "Zara": 1,
  "Uniqlo": 2,
  "Gap": 3,
  "American Eagle": 4,
  "Adidas": 5,
  "Nike": 6,
  "other": 7,
  "Banana Republic": 8,
  "Tommy Hilfiger": 9,
  "Levi's": 10,
  "Hermes": 11,
  "Chanel": 12,
  "Dior": 13,
  "Louis Vuitton": 14,
  "Gucci": 15
};

//Ordered loosely from top clothing to bottom clothing
const categoryMap = {
  "shirts": 0,
  "sweaters": 1,
  "jackets": 2,
  "dresses": 3,
  "pants": 4,
  "shoes": 5,
  "other": 6
};

//Inputs: [brand, category, original price]
const inputs = [
    [1, 1, 100], 
    [1, 1, 100],
    [1, 1, 100], 
    [1, 1, 100],
    [1, 1, 100], 
    [1, 1, 100]
];

//Outputs: [estimated price]
const outputs = [
  [0],
  [0],
  [0],
  [0],
  [0],
  [0]
];

//Train model
const regression = new MLR(inputs, outputs);

//Function to estimate resale price
export default function estimateResalePrice(brand, category, originalPrice) {
  //Maps brand and category to corresponding values
  const brandValue = brandMap[brand] || brandMap["other"];
  const categoryValue = categoryMap[category] || brandMap["other"];
  //Predict price
  const estimate = regression.predict([brandValue, categoryValue, originalPrice]);
  return Math.round(estimate * 100) / 100; // Round to 2 decimal places
}
