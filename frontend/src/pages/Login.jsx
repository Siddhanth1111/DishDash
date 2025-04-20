import { SignIn } from "@clerk/clerk-react";

const Login = () => {

  return (
    <div className="center">
      <SignIn path="/login" routing="path" signUpUrl="/signup" />
    </div>
  );
};

export default Login;
