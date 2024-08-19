
import { useState } from "react";
import { Link } from "react-router-dom";


export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("")
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(email, password, fullName);
    };
  return (
    <div className="sm:w-full rounded-[10px] lg:w-[40%] mx-auto shadow-lg h-[90vh] bg-[#2A303C]">
      <div className="rounded-[7px] pt-5">
        <img
          src="https://media.dscvr.one/fetch?fit=scale-down&height=148&media=https%3A%2F%2Fipfs.dscvr.one%2Fb2801e07-5fcb-486b-8149-9ee1b66f840b-bucket%2Fl5u7qro5crij96sxkkn.jpeg&width=148"
          className="mx-auto w-[90px] h-[90px] rounded-[7px]"
          alt=""
        />
      </div>
      <h1 className="text-center text-[2.8rem] mt-5 mb-0">Sign up</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="lg:w-[90%] mt-2 mb-8 mx-auto block inputs">
          <p className="ml-2 my-2.5 text-2xl font-medium">Name: </p>
          <input
            type="text"
            name=""
            placeholder="John Doe"
            id=""
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            className="input-field outline-none bg-inherit text-xl pl-3 border-[#434955] border-[2px] sm:w-full lg:w-full border-opacity-40 h-[45px] rounded-[10px] "
          />
        </div>
        <div className="lg:w-[90%] mt-2 mb-8 mx-auto block inputs">
          <p className="ml-2 my-2.5 text-2xl font-medium ">Email: </p>
          <input
            type="email"
            name=""
            placeholder="John@example.com"
            id=""
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="input-field outline-none bg-inherit text-xl pl-3 border-[#434955] border-[2px] sm:w-full lg:w-full border-opacity-40 h-[45px] rounded-[10px] "
          />
        </div>
        <div className="lg:w-[90%] my-8 mx-auto block inputs">
          <p className="ml-2 my-2.5 text-2xl font-medium">Password: </p>
          <input
            type="password"
            name=""
            placeholder=""
            id=""
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="input-field outline-none bg-inherit text-xl pl-3 border-[#434955] border-[2px] sm:w-full lg:w-full border-opacity-40 h-[45px] rounded-[10px] "
          />
        </div>
        <button className="inputs-btn font-medium bg-[#00FF89] text-black h-[45px] text-2xl rounded-[10px] lg:w-[90%] mx-auto block">
          Sign Up
        </button>
        <p className="text-2xl text-center my-4">
          Already have an account?{" "}
          <Link to={"/login"} className="text-[#00FF89] text-center">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
