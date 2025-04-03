import "../App.css";
import { useContext, useState } from "react";
import { GameStateContext } from "../Helpers/Contexts";

function Login() {
  const { setGameState, setUserRole } = useContext(GameStateContext);
  const [role, setRole] = useState(""); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!role) {
      alert("Please select a role (Staff or Student) to continue.");
      return;
    }
    if (!username.trim()) {
      alert("Username is required.");
      return;
    }
    if (!password.trim()) {
      alert("Password is required.");
      return;
    }

    setUserRole(role);
    setGameState("menu");
  };

  return (
    <form className="Login">
      <div className="role-selection">
        <label>
          <input
            type="radio"
            name="role"
            value="staff"
            onChange={(e) => setRole(e.target.value)}
          />
          <span> Staff</span>
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="student"
            onChange={(e) => setRole(e.target.value)}
          />
          <span> Student</span>
        </label>
      </div>
      
      <input
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </form>
  );
}

export default Login;
