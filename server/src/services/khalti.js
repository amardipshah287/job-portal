const axios = require("axios");
require("dotenv").config();

async function khaltiPaymentInitialization(details) {
  const headersList = {
    Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  console.log(`key ${process.env.KHALTI_SECRET_KEY}`);

  const bodyContent = JSON.stringify(details);
  console.log(bodyContent);

  const reqOptions = {
    url: `${process.env.KHALTI_GATEWAY_URL}/api/v2/epayment/initiate/`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };

  try {
    const response = await axios.request(reqOptions);
    return response.data;
  } catch (error) {
    console.error("Error initializing Khalti payment:", error);
    throw error;
  }
}

async function khaltiPaymentVerification(pidx) {
  const headers = {
    Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  const data = JSON.stringify({ pidx });

  const reqOptions = {
    url: `${process.env.KHALTI_GATEWAY_URL}/api/v2/epayment/lookup/`,
    method: "POST",
    headers,
    data,
  };

  try {
    const response = await axios.request(reqOptions);
    return response.data;
  } catch (error) {
    console.error("Error verifying Khalti payment:", error);
    throw error;
  }
}

module.exports = { khaltiPaymentInitialization, khaltiPaymentVerification };
