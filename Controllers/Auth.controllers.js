import UserModals from "../Modals/User.modals.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const Login = async (req , res) => {
    // res.send("Login")
    try{
    const {email , password} = req.body.data
    if(!email || !password) return res.status(401).json({success : false , message : 'All Fields are mandatory'})

    const user = await UserModals.findOne({email})

    if(!user) return res.status(401).json({success : false , message : 'Email not found'})

    const isPasswordCorrect = await bcrypt.compare(password , user.password)

    if(!isPasswordCorrect) return res.status(401).json({success : false , message : 'Password is wrong'})
    //token generation
    const token = await jwt.sign({id : user._id}, process.env.JWT_SECRET)

    return res.status(200).json({success : true  , message : "login successfull" , user : {name : user.name , id : user._id}, token});
    }catch(error){
        return res.status(500).json({success : false , message : error})
    }
}

export const Register = async (req , res) => {
    try{
        const {name , email , password} = req.body.data
        if(!name || !email || !password) return res.status(401).json({success : false , message : "All feilds are mandatory"})

        const hashedPassword = await bcrypt.hash(password , 10)

        const user = new UserModals({
            name,
            email,
            password : hashedPassword
        })

        await user.save();

        return res.status(200).json({success : true , message : "Registration Sucessfull"})
        
    }catch(error){
        return res.status(500).json({success : false , message : error})
    }
}

export const getCurrentUser = async (req , res) => {
    try{
        const {token} = req.body
        // console.log(token);
        if(!token)  return res.status(401).json({success : false , message : 'token not found'})

        const {id} = await jwt.verify(token , process.env.JWT_SECRET) 
        // console.log(id)
        
        const user = await UserModals.findById(id)
        // console.log(user)
 
        if(!user) return res.status(401).json({success : false , message : "USer not FOund"})

        return res.status(200).json({success : true , user : {name : user.name , id : user._id}})

    }catch(error){
        return res.status(500).json({success : false , message : error})
    }
} 