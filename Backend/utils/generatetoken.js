import jwt from 'jsonwebtoken'

const genratetoken=(id,res)=>{
    const token= jwt.sign({id},process.env.JWT_SEC,{
        expiresIn:"15d"
    })

res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
});

}

export default genratetoken