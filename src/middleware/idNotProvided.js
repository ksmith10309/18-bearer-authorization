export default (req, res) => {
  let error = {error:'No ID was provided'};
  res.statusCode = 400;
  res.statusMessage = 'Bad Request';
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(error));
};
