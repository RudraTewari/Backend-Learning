import mongoose,{Schema} from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username : {
        type:String,
        required : true,
        lowercase: true,
        unique : true,
        trim : true,
        index : true, // Used when a field need to be made searchable
    },
    email: {
        type : String,
        required: true,
        lowercase : true,
        unique : true,
    },
    fullName : {
        type : String,
        required : true,
        trim : true,
        index : true,
    },
    avatar:{
        type : String,
        required: true,
    },
    coverImage:{
        type : String,
    },
    watchHistory:[
        {
            type : Schema.Types.ObjectId,
            ref : "Video",
        }
    ],
    password:{
        type : String,
        required : [true, " password is required"],
    },
    refreshToken:{
        type : String,
    }
},{timestamp : true})

// Middleware before saving user
userSchema.pre("save",async function(){  // Don't use arrow function here in callback as it doen't provide 'this' 

    // If password is not modified, skip hashing
    if(!this.isModified("password")) return next()

    // Hash password before saving
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
};

// Method to generate access token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username : this.username,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


// Method to generate refresh token
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User",userSchema); 