import Home from "../components/home";
// import TherapistPage from "../components/therapists/TherapistPage";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import ForgotPassWord from "../components/auth/ForgotPassWord";
import AfterReturnCode from "../components/auth/AfterReturnCode";
import ItemPage from "../components/Item/ItemPage";
export const routes = [


  {
    path: "/item",
    private: false,
    name: "Item",
    component: ItemPage,
  },
  {
    path: "/login",
    private: false,
    name: "Login",
    component: SignIn,
  },
  {
    path: "/signup",
    private: false,
    component: SignUp,
  },
  {
    path: "/forgotpassword",
    private: false,

    component: ForgotPassWord,
  },
  {
    path: "/afterreturncode",
    private: false,
    component: AfterReturnCode,
  },
  {
    path: "/",
    private: false,
    component: Home
  }
]

