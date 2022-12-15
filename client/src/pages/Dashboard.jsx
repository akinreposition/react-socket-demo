import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddProduct from "../components/AddProduct";
import ProductItem from "../components/ProductItem";

function Dashboard() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth)
  const { products, isLoading, isError, message } = useSelector((state) => state.products)

  useEffect(() =>{
    if(!user) {
      navigate('/login')
    }
  }, [user, navigate])
  
  return (
    <div className="container">
      <section className="heading text-align">
        <span>Welcome {user && user.name}</span>
        <p>Product Dashboard</p>
      </section>

      <AddProduct />

      <section className="content">
        {products.length > 0 ? (
          <div className="goals">
            {products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <h3>You have not add any products</h3>
        ) }
      </section>
    </div>
  )
}

export default Dashboard