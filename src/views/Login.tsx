import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const data : any = localStorage.getItem('userData')
    const userData = JSON.parse(data) || {}

    const authSuccess = Object.keys(userData)?.filter((user) => {
        if(userData[user]['username'] === username && userData[user]['password'] === password){
           return true
        } 
    })
    if(authSuccess.length){
        localStorage.setItem("auth", JSON.stringify({ username }));
        navigate("/");
    } else {
        alert('invalid credential')
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
        <form onSubmit={(e) => handleLogin(e)}>
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full rounded-lg px-4 py-2 pl-10 text-gray-800 border"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4 relative">
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full rounded-lg px-4 py-2 pl-10 text-gray-800 border"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
