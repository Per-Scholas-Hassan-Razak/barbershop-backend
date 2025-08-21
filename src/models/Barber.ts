import mongoose from "mongoose";

const barberSchema = new mongoose.Schema({
    name:{type:String, required:true}, 
    email:{
        type:String,
        required:true,
        match:[/.+\@.+\..+/, 'Please fill a valid email address'] 
    },
    specialties:[String],
    available:{type:Boolean, default:true},
    createdAt:{type:Date, default:Date.now}
})

const Barber = mongoose.model('Barber', barberSchema)
export default Barber;

