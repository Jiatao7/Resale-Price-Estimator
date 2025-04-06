import { useState } from "react"

export default function Form () {
    const [error, setError] = useState(null)

    async function handleSubmit(formData) {
        //Get user inputs from form
        const brand = formData.get('brand')
        const category = formData.get('category')
        const originalPrice = Number(formData.get('original-price'))

        //Fetch
        const response = await fetch(`http://localhost:4000/api/estimates/new`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({brand, category, originalPrice})
        })
        const result = await response.json()
        console.log(result)

        //Check if response is okay
        if(!response.ok) {
            setError(result.error)
            console.log(error)
        } else {
            setError(null)
        }
    }

    return (
        <form className="form" action={handleSubmit}>
            <h3>Estimate Resale Price</h3>
            <label htmlFor="brand">Brand</label>
            <input id="brand" type="text" autoComplete="on" name="brand" placeholder="Nike"/>
            <label htmlFor="category">Category</label>
            <select id="category" name="category">
                <option value="none">Select a Category</option>
                <option value="shoes">Shoes</option>
                <option value="jackets">Jackets</option>
                <option value="sweaters">Sweaters</option>
                <option value="shirts">Shirts</option>
                <option value="pants">Pants</option>
                <option value="dresses">Dresses</option>
                <option value="shirts">Other</option>
            </select> 
            <label htmlFor="original-price">Original Price</label>
            <input id="original-price" type="number" autoComplete="on" name="original-price" placeholder="$99.99"/>
            <button className="submit-button">Estimate</button>
            {error && <div className="error">{error}</div>}
      </form>
    )
}