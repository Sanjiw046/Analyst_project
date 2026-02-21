import React, { useContext, useEffect, useState } from "react";
import style from "./cart.module.css";
import axios from "axios";
import { globalVar } from "../../globalContext/GlobalContext";
import Loading from "../loading/Loading";
import Navbar from "../../component/navbar/Navbar";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const{user,setUser,showLoader,setShowLoader} = useContext(globalVar);
  const[incOrDec,setincOrDec] = useState(null);

  if(user){
    console.log(user.id);
  }

  useEffect(() => {
    
    const fetchCartData = async () => {
      if (!user?.id) return; 
      try {
        setShowLoader(true)
        const response = await axios.get(
          `https://backend-nzyc96caw-deepak-kumars-projects-e6b882e9.vercel.app/api/cart/${user?.id}`
        );
        console.log(response);
        setCart(response.data); // maan lo response ek array hai of products
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
      finally{
        setShowLoader(false);
      }
    };
    fetchCartData();
  }, [user, incOrDec]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.courseId.courseFees * item.quantity, 0);
  };

  const decrease = async(courseId)=>{
    try {
      const dec = await axios.post("https://backend-nzyc96caw-deepak-kumars-projects-e6b882e9.vercel.app/api/cart/decrease",{courseId: courseId, userId: user?.id});
      console.log(dec);
      setincOrDec(true)
    } catch (error) {
      console.log(error);
    }
  }

  const increase = async(courseId)=>{
    try {
      const inc = await axios.post("https://backend-nzyc96caw-deepak-kumars-projects-e6b882e9.vercel.app/api/cart/add",{courseId: courseId, userId: user?.id});
      console.log(inc);
       setincOrDec(false)
    } catch (error) {
      console.log(error);
    }
  }

  const removeItem = async(courseId)=>{
    try {
      const del = await axios.delete(`https://backend-nzyc96caw-deepak-kumars-projects-e6b882e9.vercel.app/api/cart/${user?.id}/${courseId}`);
      console.log(del);
        setincOrDec(true)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <Navbar/>
    
    <div className={style.cartContainer}>
      <h2 className={style.heading}>🛒 Your Cart</h2>

      {showLoader ? <Loading/> : cart.length === 0 ? (
        <p className={style.empty}>Your cart is empty.</p>
      ) : (
        <>
          <div className={style.cartItems}>
            {cart.map((item, index) => (
              
              <div className={style.cartCard} key={index}>
                {/* <img
                  src={item.image || "https://via.placeholder.com/100"}
                  alt={item.name}
                  className={style.productImage}
                /> */}
                <div className={style.details}>
                  <h3>{item.courseId.courseName}</h3>
                  <p>Price: ₹{item.courseId.courseFees}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p className={style.subtotal}>
                    Subtotal: ₹{item.courseId.courseFees * item.quantity}
                  </p>
                </div>
                <div className={style.btngroup}>
                  <button className={style.btn} onClick={()=>increase(item.courseId._id)}>+</button>
                  <button className={style.btn} onClick={()=>removeItem(item.courseId._id)}>x</button>
                  <button className={style.btn} onClick={()=>decrease(item.courseId._id)}>-</button>
                </div>
              </div>
            ))}
          </div>

          <div className={style.cartSummary}>
            <h3>Total: ₹{calculateTotal()}</h3>
            <button className={style.checkoutBtn}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default Cart;
