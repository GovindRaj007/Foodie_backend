import mongoose from 'mongoose';
const uri = 'mongodb+srv://Foodie-admin:Milky%408599@foodie-app.pvr8xxt.mongodb.net/?retryWrites=true&w=majority&appName=Foodie-app';

 export const connectDB = async () => {
        await mongoose.connect(`${uri}`)
        .then(()=> console.log("DB Connected"));
        
}

