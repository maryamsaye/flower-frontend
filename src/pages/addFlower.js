// frontend/src/components/AddFlower.js

import React, { useState, useRef } from 'react';
import axios from 'axios';
import './addFlower.css';

const AddFlower = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: null,   // ✅ lowercase
  });

  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,   // ✅ lowercase
      }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, image: null }));   // ✅ lowercase
      setPreviewImage(null);
    }
  };

  const handleUploadClick = () => fileInputRef.current.click();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {   // ✅ lowercase
      alert("Please upload an image before submitting.");
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('image', formData.image);   // ✅ lowercase

    // Debug: log all FormData entries
    for (let pair of data.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }

    try {
      const res = await axios.post(
        "https://flower-backend-utgk.onrender.com/api/flowers",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert('Flower added successfully!');
      console.log("✅ Saved flower:", res.data);

      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        image: null,
      });
      setPreviewImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
    } catch (error) {
      console.error('❌ Error adding flower:', error.response?.data || error.message);
      alert('Failed to add flower. Check the console for details.');
    }
  };

  return (
    <div className="add-flower-container">
      <h2>Add New Flower</h2>
      <form onSubmit={handleSubmit} className="flower-form">
        
        {/* Upload Box */}
        <div className="upload-box" onClick={handleUploadClick}>
          {previewImage ? (
            <img src={previewImage} alt="Preview" className="preview-image" />
          ) : (
            <div>📷 Upload</div>
          )}
        </div>

        <input
          type="file"
          name="image"    // ✅ lowercase
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          hidden
        />

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <div className="row">
          <div className="category">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="select"
            >
              <option value="">-- Select Category --</option>
              <option value="Fresh Flowers">Fresh Flowers</option>
              <option value="Dried Flowers">Dried Flowers</option>
              <option value="Live Plants">Live Plants</option>
              <option value="Aroma Candles">Aroma Candles</option>
              <option value="Fresheners">Fresheners</option>
            </select>
          </div>

          <div className="price">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
        </div>

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <button className="submit-btn" type="submit">
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default AddFlower;
