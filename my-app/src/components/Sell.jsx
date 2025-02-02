import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../context/FirebaseContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { firestore } from "../firebase/setup";
import { collection, addDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sell = () => {
    const navigate = useNavigate();
    const { firebase } = useContext(FirebaseContext);
    const { user } = useAuth();
    const [proName, setProName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [yearOfPurchase, setYearOfPurchase] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false); 
    const date = new Date();

    const uploadToCloudinary = async (file) => {
        if (!file) return null;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "Aleena");
        formData.append("folder", "olx_clone");

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dwzcaasls/image/upload",
                formData
            );
            return response.data.secure_url;
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const validateInputs = () => {
        const newErrors = {};

        if (!proName.trim()) newErrors.proName = "Product Name is required.";
        if (!category.trim()) newErrors.category = "Category is required.";
        if (!price || isNaN(price) || parseFloat(price) <= 0)
            newErrors.price = "Please enter a valid price.";
        if (!yearOfPurchase.trim() || !/^\d{4}$/.test(yearOfPurchase))
            newErrors.yearOfPurchase = "Enter a valid year (e.g., 2023).";
        if (!description.trim() || description.length < 10)
            newErrors.description = "Description should be at least 10 characters.";
        if (!productImage) newErrors.productImage = "Please select an image.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!user) {
           
            navigate("/", { state: { toastMessage: "ou must be logged in to sell a product" } });
            return;
        }

        if (!validateInputs()) return;

        setIsLoading(true); 

        try {
            const image = await uploadToCloudinary(productImage);
            if (image) {
                await addDoc(collection(firestore, "products"), {
                    proName,
                    category,
                    price: parseFloat(price),
                    description,
                    yearOfPurchase,
                    userId: user.uid,
                    createdOn: date.toDateString(),
                    image,
                });
              
                navigate("/", { state: { toastMessage: "Product uploaded successfully!" } });
            } else {
                alert("Failed to upload image");
            }
        } catch (error) {
            console.error("Error uploading product:", error);
            alert("Failed to upload product. Please try again.");
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col space-y-6">
                    <div className="text-center font-bold text-2xl text-gray-800">
                        <h3>Enter Product Details</h3>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <input
                            type="text"
                            name="name"
                            value={proName}
                            onChange={(e) => setProName(e.target.value)}
                            placeholder="Product Name"
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.proName && <p className="text-red-500 text-sm">{errors.proName}</p>}

                        <input
                            type="text"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Category"
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

                        <input
                            type="text"
                            name="year-of-purchase"
                            value={yearOfPurchase}
                            onChange={(e) => setYearOfPurchase(e.target.value)}
                            placeholder="Year of Purchase"
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.yearOfPurchase && (
                            <p className="text-red-500 text-sm">{errors.yearOfPurchase}</p>
                        )}

                        <textarea
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Type something about the product...."
                            className="p-2 h-32 resize-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description}</p>
                        )}

                        <input
                            type="text"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price"
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

                        <input
                            type="file"
                            name="image"
                            onChange={(e) => setProductImage(e.target.files[0])}
                            placeholder="Choose A file"
                            className="p-2 border border-gray-300 rounded-md text-gray-700 file:border-none file:bg-blue-100 file:px-4 file:py-2 file:rounded-md hover:file:bg-blue-200 focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.productImage && (
                            <p className="text-red-500 text-sm">{errors.productImage}</p>
                        )}
                    </div>

                    <div className="text-center">
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center"
                            disabled={isLoading} 
                        >
                            {isLoading ? (
                                <div className="loader spinner-border animate-spin w-5 h-5 border-4 rounded-full border-t-white border-blue-400"></div>
                            ) : (
                                "Upload"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sell;
