import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Menubar from './Menubar';
import Home from './Home';
import Footer from './Footer';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/setup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';

function Main() {
  const [prod, setProd] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [menu, setMenu] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    
    if (location.state?.toastMessage) {
      
      toast.dismiss();
      toast.success(location.state.toastMessage);

      
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate]);
  const getFakeStoreProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products from Fake Store API');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getFirebaseProducts = async () => {
    try {
      const firebaseCollection = collection(firestore, 'products');
      const snapshot = await getDocs(firebaseCollection);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      throw new Error('Failed to fetch products from Firebase');
    }
  };

  const fetchAllProducts = async () => {
    try {
      const [fakeStoreProducts, firebaseProducts] = await Promise.all([
        getFakeStoreProducts(),
        getFirebaseProducts(),
      ]);
      setProd([...fakeStoreProducts, ...firebaseProducts]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar setSearch={setSearch} />
      <Menubar setMenu={setMenu} />
      <Home products={prod} search={search} menu={menu} />
      <Footer />
    </div>
  );
}

export default Main;
