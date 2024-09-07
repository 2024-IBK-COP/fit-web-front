"use client";

import CustomButton from "./_components/CustomButton";
import { useRouter } from 'next/navigation'



const Custom404 = () => {
  const router = useRouter()

  return (
    
    <div className="min-h-screen content-center">
      <div className="dark:invert mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-3">

        <h1 className="dark:invert text-center">404 | NOT FOUND</h1>

        <CustomButton nameVal="GO TO HOME" func={()=>{router.push('/');}}></CustomButton>

      </div>
        
      
    </div>
    
  );
}
export default Custom404;
