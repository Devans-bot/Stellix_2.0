import jwt from 'jsonwebtoken'

const genratetoken=(id,res)=>{
    const token= jwt.sign({id},process.env.JWT_SEC,{
        expiresIn:"15d"
    })

   res.cookie("token", token, {
  httpOnly: true,
  secure: true,          // REQUIRED
  sameSite: "none",      // REQUIRED
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

}

export default genratetoken