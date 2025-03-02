import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    const data : any = localStorage.getItem('userData')
    const userData = JSON.parse(data) || {}
    if(name && username && password){
        if(password === confirmPassword){
            localStorage.setItem("userData", JSON.stringify({...userData, [username] : { name, username, password }}));
            alert("Signup successful! Please log in.");
            navigate("/login");
        }else {
            setError("Password and Confirm password should be same.")
        }
    } else {
        setError("All fields should be filled.")
    }
   
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSignup}>
        <div className="mb-3">
            <input
              type="text"
              placeholder="name"
              className="w-full p-2 border rounded text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 border rounded text-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <p className="m-2 text-[red]">{error}</p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
