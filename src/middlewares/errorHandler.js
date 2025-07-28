//Centralized Error handler

const errorHandling = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    error: err.message,
    //error: process.env.NODE_ENV === 'production' ? null : err.message,
  });
}

export default errorHandling;