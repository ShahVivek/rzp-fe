
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const BASE_URL = "https://rzp-be.onrender.com";
  // const BASE_URL = "https://thingproxy.freeboard.io/fetch/https://rzp-be.onrender.com";
  const [dataItem, setDataItem] = useState(null);
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }
    const RZ_KEY = process.env.REACT_APP_RAZORPAY_KEY_ID
    await axios.get(`${BASE_URL}/payment/testing`);
    const result = await axios.post(`${BASE_URL}/payment/orders`);

    if (!result) {
      alert('Server error. Are you online?');
      return;
    }

    const { amount, id: order_id, currency } = result.data;
    const options = {
      key: RZ_KEY,
      amount: amount.toString(),
      currency: currency,
      name: 'Sprigstack',
      description: 'Test Transaction',
      image: { logo },
      order_id: order_id,
      webview_intent: true,
      callback_url: "https://webhook.site/606c060b-39d0-4579-adb3-fca3d13ce762",
      redirect: true,
      // handler: async function (response) {
        
      //   const data = {
      //     orderCreationId: order_id,
      //     razorpayPaymentId: response.razorpay_payment_id,
      //     razorpayOrderId: response.razorpay_order_id,
      //     razorpaySignature: response.razorpay_signature,
      //   };
      //   console.log("Before result=====",data)
      //   const result = await axios.post(`${BASE_URL}/payment/success`, data);
      //   console.log("after result=====",result)
      //   if (result && result.data) {
      //     setDataItem(result.data)
      //   }
      //   // alert(result.data.msg);
      // },
      prefill: {
        name: 'Vivek Shah',
        email: 'v7shah@gmail.com',
        contact: '9687029992',
      },
      notes: {
        address: 'Example Corporate Office',
      },
      theme: {
        color: '#61dafb',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className='App'>
        <p>Buy React now with callback url</p>
        <button className='App-link' onClick={displayRazorpay}>
          Payment of ₹1
        </button>
      <div style={{marginTop: 50, marginBottom: 20}}>Other Details</div>
      {dataItem && <div>Success {dataItem}</div>}
    </div>
  );
}

export default App;
