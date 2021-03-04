import Home from "../components/home";
// import TherapistPage from "../components/therapists/TherapistPage";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import ForgotPassWord from "../components/auth/ForgotPassWord";
export const routes = [


  {
    path: "/login",
    private: false,
    name: "Login",
    component: SignIn,
  },
  {
    path: "/signup",
    private: false,
    name: "Sign Up",
    component: SignUp,
  },
  {
    path: "/forgotpassword",
    private: false,

    component: ForgotPassWord,
  },
  {
    path: "/",
    private: false,
    component: Home
  }
]

