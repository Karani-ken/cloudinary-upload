// App.js

import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get("http://localhost:4000/allProducts");
      setProducts(response.data);
    };
    fetchImages();
  }, []);
  const handleChange = (e) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('image', file);
     const res = await axios.post("http://localhost:4000/createproduct", data);
    setMessage(res.data)
  };

  return (
    <div className="p-3 mx-3 inline items-center">
      <h1 className="font-black text-3xl">Images Uploads</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit} className='w-52 h-52 m-5'>
        <input type="text" name="name" placeholder="name" onChange={handleChange} 
        className='border-2 rounded-lg border-black m-3 text-center'/>
        <input type="email" name="email" placeholder="email"  onChange={handleChange}
        className='border-2 rounded-lg border-black m-3 text-center'/>
        <input type="file" name="image" onChange={handleFileChange}
        />
        <button type="submit" className="border-2 bg-green-300 text-2xl border-blue-700 m-3 p-2 rounded-lg">Submit</button>
     </form>
      <div className="flex justify-evenly items-center ">
        {products.map((product, key) => (
          < div key={product._id} className='border-2 border-black rounded-sm text-center bg-slate-300'>
           <img
            src={product.image}
            
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
          <h1 className="font-black text-2xl m-3 p-3">{product.name}</h1>

          </div>
         
        ))}
      </div>
    </div>
  );
}

export default App;

