import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      // SAVE USER TO LOCAL STORAGE
      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      // REDIRECT
      navigate("/admin");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Login failed"
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

        <h1>Login</h1>

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

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

        <button type="submit">

          {loading
            ? "Loading..."
            : "Login"}

        </button>

      </form>

    </div>
  );
}

export default LoginPage;