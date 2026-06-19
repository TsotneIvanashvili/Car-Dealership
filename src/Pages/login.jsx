import { Link, useNavigate } from "react-router-dom";
import { getLocal, setLocal } from "../utils/localstorage";

const Login = () => {
      const navigator = useNavigate()
    





    const handleLogin = (e) => {
        e.preventDefault()


        const exists = getLocal("Users").find(user => user.email === e.target.email.value && user.pass === e.target.pass.value)


        if(exists){
            setLocal("CurrentUser", exists)
            navigator("/")
        }
        else{
            alert("Wrong")
        }
        
        

    }











  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0E0F13] text-white flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-linear-to-t from-[#050914] via-transparent to-[#05070d]/60" />

      <div className="relative z-10 w-full max-w-125 text-center bg-black/25 backdrop-blur-md px-8 py-10 rounded-2xl shadow-2xl shadow-black/50">
        <div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Welcome Back
          </h1>

          <div className="mx-auto mt-4 h-0.75 w-24 bg-white rounded-full" />

          <p className="mt-5 text-[#CBD5E1] text-base md:text-lg">
            Access your account and continue exploring premium vehicles.
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-10 flex flex-col gap-5">
          <input
            className="h-14 w-full rounded-md border border-white/35 bg-white/10 px-5 text-white placeholder:text-white/55 outline-none transition focus:border-white focus:bg-white/15"
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />

          <input
            className="h-14 w-full rounded-md border border-white/35 bg-white/10 px-5 text-white placeholder:text-white/55 outline-none transition focus:border-white focus:bg-white/15"
            type="password"
            name="pass"
            placeholder="Password"
            required
          />

          <div className="flex items-center justify-between text-sm text-[#CBD5E1]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-white" />
              Remember me
            </label>

            <button
              type="button"
              className="text-white hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          <button className="mt-2 h-14 w-full rounded-md bg-white text-black text-sm font-bold uppercase tracking-[0.25em] transition hover:bg-transparent hover:text-white border border-white cursor-pointer">
            Login
          </button>
        </form>

        <p className="mt-7 text-sm text-[#CBD5E1]">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-white font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;