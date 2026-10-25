import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, set_form] = useState({});
  const navigate = useNavigate();
  async function submit_handler(e) {
    e.preventDefault();
  }
  function input_handler(e) {
    set_form(function (prev) {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  return (
    <>
      <main className="w-full min-h-screen bg-blue-900 flex justify-center items-center">
        <div className="w-1/4 h-3/5 bg-blue-950 flex justify-center items-center py-10 px-5 shadow-md rounded-xs">
          <form onSubmit={submit_handler} className=" flex flex-col gap-3.5 ">
            <div className="flex flex-col gap-1">
              <label>Email Address</label>
              <input
                type="email"
                onChange={input_handler}
                name="email"
                value={form.value}
                placeholder="Enter your email"
                className="border border-blue-400 rounded-md py-1 px-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Password</label>
              <input
                type="password"
                onChange={input_handler}
                name="password"
                value={form.value}
                placeholder="Create a STRONG password"
                className="border border-blue-400 rounded-md py-1 px-2"
              />
            </div>

            <div className="w-full flex gap-1.5">
              <span>Already registered?</span>
              <span
                onClick={function () {
                  navigate("/register");
                }}
                className="underline cursor-pointer hover:text-blue-300"
              >
                Register
              </span>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-3.5 bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
