import MLR from "ml-regression-multivariate-linear";

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
    const estimate = regression.predict([brand, category, originalPrice]);
    return Math.round(estimate * 100) / 100; // Round to 2 decimal places
}
