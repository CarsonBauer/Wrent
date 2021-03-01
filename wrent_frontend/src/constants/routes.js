import Home from "../components/home";
// import TherapistPage from "../components/therapists/TherapistPage";
import SignIn from "../components/auth/SignIn";
export const routes = [


  {
    path: "/login",
    private: false,
    name: "Login",
    component: SignIn,
  },
  {
    path: "/",
    private: false,
    component: Home
  }
]

