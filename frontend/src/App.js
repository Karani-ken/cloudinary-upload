// App.js

import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get("http://localhost:4000/allProducts");
      setProducts(response.data);
    };
    fetchImages();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    await axios.post("http://localhost:4000/upload", formData);
    setFile(null);
    window.location.reload();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
  </form>
      <div>
        {products.map((product, key) => (
          < div key={product._id}>
           <img
            src={product.imageUrl}
            alt={product.public_id}
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
          <h1>{product.name}</h1>

          </div>
         
        ))}
      </div>
    </div>
  );
}

export default App;

