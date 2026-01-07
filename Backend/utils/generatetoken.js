import jwt from 'jsonwebtoken'

const genratetoken=(id)=>{
    const token= jwt.sign({id},process.env.JWT_SEC,{
        expiresIn:"15d"
    })

}

export default genratetoken