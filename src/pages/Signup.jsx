import { SignUp } from "@clerk/clerk-react";

const Signup = () => {

 

  return (
    <div className="center">
      <SignUp path="/signup" routing="path" signInUrl="/login" />
    </div>
  );
};

export default Signup;
