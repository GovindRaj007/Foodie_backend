import mongoose from 'mongoose';
const uri = 'mongodb+srv://suryavenkat:Surya2012138@cluster0.xirij.mongodb.net/customer?retryWrites=true&w=majority';

 export const connectDB = async () => {
        await mongoose.connect(`${uri}`)
        .then(()=> console.log("DB Connected"));
        
}

