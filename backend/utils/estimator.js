const brandMultiplier = {
    "gucci": 0.8,
    "nike": 0.6,
    "adidas": 0.5,
    "zara": 0.3,
    "default": 0.5,
};

const categoryMultiplier = {
    "shoes": 1.0,
    "jacket": 0.9,
    "shirt": 0.8,
    "default": 0.9,
};

export default function estimateResalePrice(brand, category, originalPrice) {
    const brandFactor = brandMultiplier[brand.toLowerCase()] || brandMultiplier["default"];
    const categoryFactor = categoryMultiplier[category.toLowerCase()] || categoryMultiplier["default"];
    const estimated = originalPrice * brandFactor * categoryFactor;
    return Math.round(estimated * 100) / 100; // Round to 2 decimal places
}

