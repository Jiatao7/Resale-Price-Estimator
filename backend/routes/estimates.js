import express from 'express';
import estimateResalePrice from '../utils/estimator.js';
import { getEstimates, createEstimate } from '../utils/database.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const estimates = await getEstimates();
    res.status(200).json({estimates});
});

router.post('/new', async (req, res) => {
    const {brand, category, originalPrice} = req.body

    let missingFields = []
  
    if (!brand) {
      missingFields.push('brand')
    }
    if (!category) {
      missingFields.push('category')
    }
    if (!originalPrice) {
      missingFields.push('original price')
    }
    if (missingFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', missingFields })
    }
    if(isNaN(originalPrice) || originalPrice <= 0) {
        return res.status(400).json({ error: 'Please enter a positive number for original price', missingFields })
    }

    const estimatedPrice = estimateResalePrice(brand, category, originalPrice);
    const estimate = await createEstimate(brand, category, originalPrice, estimatedPrice);
    return res.status(200).json(estimate);
});

export default router;