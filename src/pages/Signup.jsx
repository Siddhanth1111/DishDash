import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault(); // prevent page reload
    // Handle signup logic (e.g. API call)
    console.log({ name, phone, password });
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-110">
        <h1 className="text-4xl font-bold text-center mb-6">Dish-Dash</h1>

        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Register
        </h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
            required
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
            required
          />

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition"
          >
            Register
          </button>
        </form>

        <div className="flex justify-center mt-4 text-sm">
          <h4 className="mr-1">Already have an account?</h4>
          <h4
            className="underline cursor-pointer text-yellow-600 hover:text-yellow-700"
            onClick={() => navigate("/login")}
          >
            Login
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Signup;
