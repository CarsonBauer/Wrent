import Home from "../components/home";
// import TherapistPage from "../components/therapists/TherapistPage";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
export const routes = [


  {
    path: "/login",
    private: false,
    name: "Login",
    component: SignIn,
  },
  {
    path: "/sign up",
    private: false,
    name: "Sign Up",
    component: SignUp,
  },
  {
    path: "/",
    private: false,
    component: Home
  }
]

