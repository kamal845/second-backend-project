module.exports = {
  out: function (response, data) {
    let statusCode = data.statusCode || 500;
    let responseData = { message: 'Internal server error' };
    if (statusCode === 401) {
      responseData = { message: 'Unauthorized user' };
    } else if (statusCode === 500) {
      responseData = { message: 'Internal server error or invalid data' };
    } else if (statusCode === 404) {
      responseData = { message: data.message || 'Not found' };
    } else if (statusCode === 400) {
      responseData = { message: 'Bad request' };
    } else if (statusCode === 200) {
      responseData = { message: data.message || 'Success' };
    }

    response.status(statusCode).json(responseData);
  }
};
