"use client"
import { useVerifyEmailMutation } from "@/hooks/auth/useVerifyEmailMutation";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const VerifyEmailPage = () => {
    
    const router = useRouter();
    const params = useParams()

    const {token} = params

    const verifyEmail = useVerifyEmailMutation(
        {
            onSuccess: (data: any) => {
              router.push('/login');
      
          },
          }
    )

    useEffect(() => {
        if (!token) {
          console.log("Invalid verification link.");
          return;
        }

        verifyEmail.mutate({verifyId:token as string })
        console.log("api hitted")
    
        
      }, [token]);


    console.log("params here email", token)

    const title = "Email Verified Successfully!"
    const subtitle = "Your email address has been confirmed."
    const text = "Thank you for verifying your email! You can now access all the features of our platform. We're excited to have you on board and look forward to helping you make the most of your experience. If you have any questions or need assistance, feel free to reach out to our support team";

  return (
   <>
    <div className="mx-4 lg:mx-8 xl:mx-12">
      <h1 className="mb-16">{title}</h1>
      <h4 className="mb-5">{subtitle}</h4>
      <p className="general-text max-w-sm">{text}</p>
    </div>
   </>
  );
};

export default VerifyEmailPage;
