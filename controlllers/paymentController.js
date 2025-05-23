const axios = require('axios');

exports.initiatePayment = async (req, res) => {
  const { customer_name, customer_email, amount } = req.body;

  try {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: customer_email,
        amount: amount * 100
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json({
      payment_url: response.data.data.authorization_url,
      reference: response.data.data.reference,
      status: 'success'
    });
  } catch (error) {
    res.status(500).json({ message: 'Payment initiation failed' });
  }
};

exports.getPaymentStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    });

    const data = response.data.data;

    res.json({
      payment: {
        id: data.id,
        customer_name: data.customer.name || "N/A",
        customer_email: data.customer.email,
        amount: data.amount / 100,
        status: data.status
      },
      status: 'success',
      message: 'Payment details retrieved successfully.'
    });
  } catch (error) {
    res.status(400).json({ message: 'Failed to verify payment.' });
  }
};
