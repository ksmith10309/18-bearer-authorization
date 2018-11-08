export default (err, req, res) => {
  let error = {error:'ID was not found'};
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(error));
};
