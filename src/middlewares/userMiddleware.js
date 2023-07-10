export function userAuthentication(req, res, next) {
  try {
    const authheader = req.headers.authorization;
    console.log({ authheader });
    next();
  } catch (error) {
    res.status(404).send(err);
  }
}
