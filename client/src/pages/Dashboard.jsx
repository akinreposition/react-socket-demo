import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddProduct from "../components/AddProduct";

function Dashboard() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth)

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
        {/* {product.length > 0 ? () : () } */}
      </section>
    </div>
  )
}

export default Dashboard