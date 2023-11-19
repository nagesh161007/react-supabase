import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../utils/supabase"; // Update the import path
import "./Listing.css";

function ListingForm() {
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const fileUploadRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    color: "",
    size: "",
    gender: "",
    condition: "",
    price: "",
    status: "AVAILABLE",
    image_url: ""
  });

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.title.trim()) tempErrors.title = "Title is required";
    if (!formData.description.trim())
      tempErrors.description = "Description is required";
    if (!formData.category.trim()) tempErrors.category = "Category is required";
    if (!formData.color.trim()) tempErrors.color = "Color is required";
    if (!formData.size.trim()) tempErrors.size = "Size is required";
    if (!formData.gender.trim()) tempErrors.gender = "Gender is required";
    if (!formData.condition.trim())
      tempErrors.condition = "Condition is required";
    if (!formData.price.trim()) tempErrors.price = "Price is required";
    if (!imageFile) tempErrors.image_url = "Image URL is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setUploading(true);

    const file = imageFile;
    if (file) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { errors } = await supabase.storage
        .from("listings")
        .upload(`${fileName}`, file);

      if (errors) {
        setErrors({ ...errors, image_url: "Failed to upload image." });
        setUploading(false);
        return;
      }
      const { data: imageUrl } = supabase.storage
        .from("listings")
        .getPublicUrl(`${fileName}`);

      formData.image_url = imageUrl.publicUrl;
      const {
        data: { user }
      } = await supabase.auth.getUser();
      console.log(user);
      formData.profile_id = user.id;

      const { error: insertError } = await supabase
        .from("listings")
        .insert([formData])
        .single();
      setUploading(false);
      if (!insertError) {
        navigate("/");
      }
    }
  };

  const handleImageUpload = () => {
    console.log("clicked");
    fileUploadRef.current.click();
  };

  const onChangeImageUpload = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setImageFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="listing-form-container">
      <form onSubmit={handleSubmit} className="listing-form">
        <div className="image-section" onClick={handleImageUpload}>
          <div>
            <input
              type="file"
              ref={fileUploadRef}
              hidden
              onChange={onChangeImageUpload}
              style={{ display: "none" }}
            />
          </div>
          {imageFile ? (
            <img
              width={300}
              height={300}
              src={imageUrl}
              alt="Preview"
              className="image-preview"
            />
          ) : (
            <div className="upload-image">Click here to upload image </div>
          )}
          {errors.image_url && <p className="error">{errors.image_url}</p>}
        </div>
        <div className="form-content">
          <div className="form-fields">
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <p>{errors.title}</p>}
            </div>

            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && <p>{errors.description}</p>}
            </div>

            <div className="form-group">
              <label>Category:</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                <option value="MensWear">Men's Wear</option>
                <option value="WomensWear">Women's Wear</option>
                <option value="ChildrensWear">Children's Wear</option>
                <option value="Accessories">Accessories</option>
              </select>
              {errors.category && <p>{errors.category}</p>}
            </div>

            <div className="form-group">
              <label>Color:</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
              />
              {errors.color && <p>{errors.color}</p>}
            </div>

            <div className="form-group">
              <label>Size:</label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
              />
              {errors.size && <p>{errors.size}</p>}
            </div>

            <div className="form-group">
              <label>Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unisex">Unisex</option>
              </select>
              {errors.gender && <p>{errors.gender}</p>}
            </div>

            <div className="form-group">
              <label>Condition:</label>
              <input
                type="text"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
              />
              {errors.condition && <p>{errors.condition}</p>}
            </div>

            <div className="form-group">
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && <p>{errors.price}</p>}
            </div>
          </div>
          <button
            type="submit"
            className="listing-form-button"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Submit Listing"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ListingForm;
