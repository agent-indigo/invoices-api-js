const catchRequestErrors = fn => (
  request,
  response,
  next
) => Promise.resolve(fn(
  request,
  response,
  next
)).catch(next)
export default catchRequestErrors