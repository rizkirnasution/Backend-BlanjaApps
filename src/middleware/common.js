const validate = (req, res) => {
    const stock = Number(req.body.stock);
    if (isNaN(stock)) {
      res.json({
        Message: "input must be number",
      });
    }
  };
  
  module.exports = validate;