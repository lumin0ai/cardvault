const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      return res.status(400).json({
        secure: false,
        error: error.errors,
      });
    }
  };
};

export default validate;
