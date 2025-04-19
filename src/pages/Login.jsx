import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // prevent page reload
    // add auth logic here if needed
    navigate("/"); // redirect to home
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-110">
        <h1 className="text-4xl font-bold text-center mb-6">Dish-Dash</h1>

        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full mb-2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
            required
          />
          <h4 className="text-red-500 mb-4 text-sm">
            *Use your phone number as username
          </h4>

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
            required
          />

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition"
          >
            Login
          </button>
        </form>

        <div className="flex justify-center gap-1 mt-4 text-sm">
          <h4>New user?</h4>
          <h4
            className="underline cursor-pointer text-yellow-600 hover:text-yellow-700"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Register
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Login;
