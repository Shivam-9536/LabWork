import { useState } from "react";
import "./WorkerLoginPage.css";

function WorkerLoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/workers/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            phone,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      // Save login information
      localStorage.setItem(
        "workerToken",
        data.token
      );

      localStorage.setItem(
        "workerData",
        JSON.stringify(data.worker)
      );

      // Go to dashboard
      window.location.href =
        "/worker/dashboard";

    } catch (error) {
      setError(
        error.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="worker-login-page">

      <div className="worker-login-card">

        <div className="login-logo">
          LAB<span>WORK</span>
        </div>

        <span className="login-label">
          WORKER PORTAL
        </span>

        <h1>
          Welcome back.
        </h1>

        <p className="login-description">
          Login to manage your jobs and
          receive new service requests.
        </p>

        <form onSubmit={handleLogin}>

          <div className="login-field">

            <label>
              Mobile Number
            </label>

            <input
              type="tel"
              placeholder="Enter your mobile number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

          </div>


          <div className="login-field">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>


          {error && (
            <div className="login-error">
              {error}
            </div>
          )}


          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login to LABWORK →"
            }
          </button>

        </form>


        <div className="login-footer">

          Don't have a worker account?

          <a href="/worker/register">
            Join LABWORK
          </a>

        </div>

      </div>

    </div>
  );
}

export default WorkerLoginPage;