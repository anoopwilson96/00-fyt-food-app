import mongoose from 'mongoose';


export const  databaseConfig = ()=>{

    main().catch(err => console.log(err));

    async function main() {
         await mongoose.connect(process.env.DATABASE_URL)
         console.log("connected");
         } 
  }
  
  