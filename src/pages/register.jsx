// import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConpassword] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (conpassword === password) {
        if (password.length < 6) {
          setError("Password must be at least 6 characters.");
          return;
        }
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("user", user);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setError("Registration failed. auth/email-already-in-use");
    }
    setEmail("");
    setPassword("");
    setConpassword("");
  };

  return (
    <>
      <div className="h-screen text-white flex justify-center items-center bg-cover bg-[url('https://theagiledirector.com/images/kanban-blambarde-BYNC-small.jpg')] ">
        <div className="bg-slate-800 border border-slate-400 rounded-md p-10 shadow-lg backdrop-blur-md bg-opacity-30 w-1/4">
          <h1 className="text-4xl font-bold text-white text-center mb-6 ">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="relative mt-3 mb-2" htmlFor="email">
              <b>Email</b>
            </label>
            <input
              className="block w-70 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none"
              type="email"
              name="email"
              id="email"
              placeholder="Example@gmail.com"
              value={email}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              required
            />

            <label className="relative mt-3 mb-2" htmlFor="confirm-psw">
              <b>Confirm Password</b>
            </label>
            <input
              className="block w-70 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none"
              type="password"
              placeholder="Confirm-Password"
              name="confirm-psw"
              value={conpassword}
              onChange={(e) => setConpassword(e.target.value)}
              required
            />

            <button
              className="w-full font-medium mt-5 rounded-full bg-white text-purple-500 hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-white py-2 transition-colors duration-500"
              type="submit"
            >
              Register
            </button>
            <div className="flex text-center justify-center my-4 gap-1 ">
              <p>If you have an account</p>
              <Link className="text-red-500" to="/">
                Login!
              </Link>
            </div>
          </form>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </>
  );
}

export default Register;
