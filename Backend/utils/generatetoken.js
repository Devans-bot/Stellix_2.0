import jwt from 'jsonwebtoken'

const genratetoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SEC, {
    expiresIn: "15d",
  });
};




export default genratetoken