import { useState, useEffect } from 'react';

function App() {
  // State for storing the list of items
  const [items, setItems] = useState([]);
  
  // State for the form inputs
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");

  // Function to fetch data from the backend
  const fetchItems = async () => {
    try {
      const response = await fetch('https://item-manager-backend-tt1n.onrender.com');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Run fetchItems once when the page loads
  useEffect(() => {
    fetchItems();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Package the new data
    const payload = { name, quantity, price, company };

    try {
      await fetch('http://localhost:4000/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      // Clear the form after success
      setName("");
      setQuantity(1);
      setPrice("");
      setCompany("");
      
      // Refresh the list to show the new item
      fetchItems();
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Item Manager Pro</h1>
      
      {/* The Input Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Item name" 
          required 
          style={{ padding: '8px' }}
        />
        <input 
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          min="1" 
          required 
          style={{ padding: '8px' }}
        />
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          placeholder="Price ($)" 
          required 
          style={{ padding: '8px' }}
        />
        <input 
          type="text" 
          value={company} 
          onChange={(e) => setCompany(e.target.value)} 
          placeholder="Company Name" 
          required 
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add Item
        </button>
      </form>

      {/* The Data List */}
      <h2>Inventory List</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {items.map((item) => (
          <li key={item._id} style={{ background: '#f4f4f4', margin: '5px 0', padding: '10px', borderRadius: '4px' }}>
            <strong>{item.name}</strong> (Qty: {item.quantity}) <br/>
            <small>Price: ${item.price} | Company: {item.company}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;