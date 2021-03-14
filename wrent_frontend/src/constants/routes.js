import Home from "../components/home";
// import TherapistPage from "../components/therapists/TherapistPage";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import ForgotPassWord from "../components/auth/ForgotPassWord";
import AfterReturnCode from "../components/auth/AfterReturnCode";
import ItemPage from "../components/Item/ItemPage";
import UpdatePassword from "../components/auth/UpdatePassword";
import AddItem from "../components/auth/AddItem";
export const routes = [


  {
    path: "/item/:id",
    private: false,
    name: "Item",
    component: ItemPage,
  },
  {
    path: "/addItem",
    private: false,
    name: "AddItem",
    component: AddItem
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
    path: "/updatepassword",
    private: false,
    component: UpdatePassword,
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

