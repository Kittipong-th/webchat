import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      navigate("/chat");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="h-screen text-white flex justify-center items-center bg-cover bg-[url('https://theagiledirector.com/images/kanban-blambarde-BYNC-small.jpg')] ">
        <div className="bg-slate-800 border border-slate-400 rounded-md p-10 shadow-lg backdrop-blur-md bg-opacity-30 ">
          <h1 className="text-4xl font-bold text-white text-center mb-6 ">
            Sign In
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="relative mt-3 mb-2" htmlFor="email">
              <b>Email</b>
            </label>
            <input
              className="block w-70 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none"
              type="email"
              name="email"
              value={email}
              id="email"
              placeholder="Example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="relative mt-3 mb-2" htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              className="block w-70 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none"
              type="password"
              placeholder="Password"
              name="psw"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              className="w-full font-medium mt-5 rounded-full bg-white text-purple-500 hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-white py-2 transition-colors duration-500"
              type="submit"
            >
              Login
            </button>
            <div className="flex text-center justify-center my-4 gap-1 ">
              <p>If you dont dont have accout</p>
              <Link className="text-red-500" to="/register">
                Register here!
              </Link>
            </div>
          </form>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </>
  );
}

export default Login;
