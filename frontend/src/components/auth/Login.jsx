import { Label } from "../ui/label";
import { Input } from "../ui/input";

import "../../css/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../slices/authSlice";
function Login() {
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [role, setRole] = useState("student");
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  function handleChangeInput(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/user/login`,
        { ...input, role: role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (data?.success) {
        dispatch(setUser(data?.user))
        localStorage.setItem("user", JSON.stringify(data?.user));
        navigate("/");
        toast.success(data?.message);
      }
     
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
  return (
    <section className="wrapper">
      <div className="container">
        <header>Login</header>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-box">
            <label>Email Address</label>
            <input
              name="email"
              value={input.email}
              onChange={handleChangeInput}
              type="email"
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="input-box">
            <label>Password</label>
            <input
              name="password"
              value={input.password}
              onChange={handleChangeInput}
              type="password"
              placeholder="Enter Password"
              required
            />
          </div>

          <div className="gender-box">
            <h3>Select Role</h3>
            <div className="gender-option">
              <div className="gender">
                <input
                  type="radio"
                  id="check-male"
                  value={"student"}
                  onChange={(e) => setRole(e.target.value)}
                  name="role"
                  defaultChecked
                />
                <label htmlFor="check-male">Student</label>
              </div>
              <div className="gender">
                <input
                  type="radio"
                  id="check-female"
                  value={"recruiter"}
                  onChange={(e) => setRole(e.target.value)}
                  name="role"
                />
                <label htmlFor="check-female">Recruiter</label>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <p>
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-blue-500 hover:underline">
                Signup
              </Link>
            </p>
          </div>
          {loading ? (
            <button type="submit">
              <i className="fa-solid fa-spinner fa-spin-pulse"></i> Please
              Wait...
            </button>
          ) : (
            <button type="submit">
              Login
            </button>
          )}
        </form>
      </div>
    </section>
  );
}

export default Login;
