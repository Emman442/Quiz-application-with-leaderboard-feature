import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { SphereSpinner } from "react-spinners-kit";
import { UserButton, CivicAuthProvider, useUser } from "@civic/auth/react";

export default function Login() {
  const user = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        console.log(data);
        const userToken = data.token;
        const userProfile = data.data.user;

        // setToken(userToken);

        const cookies = {
          profile: userProfile,
          token: userToken,
        };

        // console.log("Current Cookies:", document.cookie);

        const jsonString = JSON.stringify(cookies);

        // Store data in localStorage
        localStorage.setItem("token", jsonString);
        toast.success("Login Succcessful");
        navigate("/quiz");
      } else {
        setLoading(false);
        toast.error(data?.message);
      }
    } catch (error) {
      setLoading(false);
      console.log("catched Error: ", error);
      toast.error(error?.message);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="login rounded-[10px] lg:w-[40%] w-full mx-auto shadow-lg h-auto bg-[#2A303C] p-12">
          <div className="rounded-[7px] pt-5">
            <img
              src="/Solana.svg"
              className="mx-auto w-[90px] h-[90px] rounded-[7px]"
              alt=""
            />
          </div>
          <h1 className="text-center text-[2.8rem] mt-5 mb-0">Log in</h1>
          <form action="" onSubmit={handleSubmit}>
            <div className="lg:w-[90%] mt-2 mb-8 mx-auto block inputs">
              <p className="ml-2 my-2.5 text-2xl font-medium">Email: </p>
              <input
                type="email"
                placeholder="John@example.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="input-field bg-inherit text-xl pl-3 border-[#434955] border-[2px] w-full border-opacity-40 h-[45px] rounded-[10px]"
              />
            </div>
            <div className="lg:w-[90%] my-8 mx-auto block inputs">
              <p className="ml-2 my-2.5 text-2xl font-medium">Password: </p>
              <input
                type="password"
                placeholder=""
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="input-field bg-inherit text-xl pl-3 border-[#434955] border-[2px] sm:w-full lg:w-full border-opacity-40 h-[45px] rounded-[10px]"
              />
              <Link
                to={"/forgot-password"}
                className="text-[#00FF89] text-end block my-3 text-2xl"
              >
                forgot password?
              </Link>
            </div>
            <button
              className="inputs-btn font-medium capitalize bg-[#00FF89] text-black h-[45px] text-2xl rounded-[10px] lg:w-[90%] mx-auto justify-center flex items-center text-2xl"
              disabled={loading}
            >
              {loading ? <SphereSpinner /> : "Login"}
            </button>

            <p>Or Sign in Using Civic</p>
            <div className="flex items-center justify-center user-btn">
            <UserButton />

            </div>
            
            <p className="text-2xl text-center my-4">
              Dont have an account yet?{" "}
              <Link to={"/register"} className="text-[#00FF89] text-center">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
