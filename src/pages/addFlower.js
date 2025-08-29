// frontend/src/pages/AddFlower.js
import { useState } from "react";

const AddFlower = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState(null);

  const handleAddFlower = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await fetch(
        "https://flower-backend-utgk.onrender.com/api/flowers",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, price, description, image, category }),
        }
      );

      const data = await res.json();
      console.log("Add flower response:", data);

      if (!res.ok) {
        setMessage(data.error || "Failed to add flower");
        return;
      }

      setMessage("Flower added successfully ✅");
      setTitle("");
      setPrice("");
      setDescription("");
      setImage("");
      setCategory("");
    } catch (err) {
      console.error("Add flower error:", err);
      setMessage("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="add-flower-container">
      <h2>Add Flower</h2>
      <form onSubmit={handleAddFlower}>
        <input
          type="text"
          placeholder="Flower Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <button type="submit">Add Flower</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AddFlower;
