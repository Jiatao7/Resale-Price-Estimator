import { useState } from "react"

export default function Form () {
    const [loading, setLoading] = useState(false)
    const [errorFields, setErrorFields] = useState({
        brand: null,
        category: null,
        originalPrice: null
    })

    async function handleSubmit(e) {
        e.preventDefault()

        //Get user inputs from form
        const formData = new FormData(e.target)
        const brand = formData.get('brand')
        const category = formData.get('category')
        const originalPrice = Number(formData.get('original-price'))

        //Check for valid inputs
        var brandError = null
        var categoryError = null
        var originalPriceError = null
        if(!brand) {
            brandError = 'Please enter a brand'
        }
        if(category === "none") {
            categoryError = 'Please select a category'
        }
        if(!originalPrice) {
            originalPriceError = 'Please enter a valid original price'
        }
        else if(originalPrice < 0) {
            originalPriceError = 'Please enter a positive value for original price'
        }
        setErrorFields({brand: brandError, category: categoryError, originalPrice: originalPriceError})
        if(brandError || categoryError || originalPriceError) {
            return;
        }

        //Fetch
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:4000/api/estimates/new`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({brand, category, originalPrice})
            })
            const result = await response.json()
            console.log(result)
        } catch(err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h3>Estimate Resale Price</h3>
            <label htmlFor="brand">Brand</label>
            <input id="brand" type="text" autoComplete="on" name="brand" placeholder="Nike" disabled={loading}/>
            {errorFields['brand'] && <div className="error">{errorFields['brand']}</div>}
            <label htmlFor="category">Category</label>
            <select id="category" name="category" disabled={loading}>
                <option value="none">Select a Category</option>
                <option value="shoes">Shoes</option>
                <option value="jackets">Jackets</option>
                <option value="sweaters">Sweaters</option>
                <option value="shirts">Shirts</option>
                <option value="pants">Pants</option>
                <option value="dresses">Dresses</option>
                <option value="shirts">Other</option>
            </select> 
            {errorFields['category'] && <div className="error">{errorFields['category']}</div>}
            <label htmlFor="original-price">Original Price</label>
            <input id="original-price" type="number" autoComplete="on" name="original-price" placeholder="$99.99" disabled={loading}/>
            {errorFields['originalPrice'] && <div className="error">{errorFields['originalPrice']}</div>}
            <button className="submit-button" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
            </button>
      </form>
    )
}