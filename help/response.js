module.exports = {
  out: function (request, response, data) {
    if (data.statusCode === 401) {
      response.status(data.statusCode).json({
        message: "unauthorized user"
      });
    } else if (data.statusCode === 500) {
      response.status(data.statusCode).json({
        message: "Internal server error or invalid data"
      });
    } else if (data.statusCode === 404) {
      response.status(data.statusCode).json({
        message: data.message
      });
    } else if (data.statusCode === 400) {
      response.status(data.statusCode).json({
        message: 'bad request'
      });
    } else if (data.statusCode === 200) {
      response.status(data.statusCode).json({
        message: data ? resultData : 'success'
      });
    } else {
      response.status(500).json({
        message: 'Internal server error'
      });
    }
  }
};
