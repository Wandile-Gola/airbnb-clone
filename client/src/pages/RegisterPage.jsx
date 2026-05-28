import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("user");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      const { data } = await axios.post(
        "http://127.0.0.1:5000/api/users/register",
        {
          username,
          email,
          password,
          role,
        }
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      navigate("/admin");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-page">

      <form
        className="login-form"
        onSubmit={submitHandler}
      >

        <h1>Create Account</h1>

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          required
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
        >
          <option value="user">
            User
          </option>

          <option value="host">
            Host
          </option>
        </select>

        <button type="submit">

          {loading
            ? "Loading..."
            : "Register"}

        </button>

      </form>

    </div>
  );
}

export default RegisterPage;