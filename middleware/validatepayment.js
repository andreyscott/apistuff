module.exports = (req, res, next) => {
  const { customer_name, customer_email, amount } = req.body;
  if (!customer_name || !customer_email || !amount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  next();
};
