const notFound = (req, res) => {
  res.status(404).json({
    message: 'Url not found',
  });
};

module.exports = notFound;
