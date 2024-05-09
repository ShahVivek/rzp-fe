
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
      // callback_url: "https://rzp-be.onrender.com/payment/callback",
      callback_url: "https://eneqd3r9zrjok.x.pipedream.net",
      redirect: true,
      webview_intent: true,
      currency: currency,
      name: 'Sprigstack',
      description: 'Test Transaction',
      image: { logo },
      order_id: order_id,
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
        <p>React RZP example</p>
        <button className='App-link' onClick={displayRazorpay}>
          ₹1 Payment
        </button>
      <div style={{marginTop: 50, marginBottom: 20}}>Other Details</div>
      {dataItem && <div>Success {dataItem}</div>}
    </div>
  );
}

export default App;
