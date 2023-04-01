// App.js

import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get("http://localhost:5000/images");
      setImages(response.data);
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
    await axios.post("http://localhost:5000/upload", formData);
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
        {images.map((image) => (
          <img
            key={image.public_id}
            src={image.url}
            alt={image.public_id}
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

