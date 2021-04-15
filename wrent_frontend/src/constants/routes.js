import Home from "../components/home";
// import TherapistPage from "../components/therapists/TherapistPage";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import ForgotPassWord from "../components/auth/ForgotPassWord";
import AfterReturnCode from "../components/auth/AfterReturnCode";
import ItemPage from "../components/Item/ItemPage";
import UpdatePassword from "../components/auth/UpdatePassword";
import AddItem from "../components/auth/AddItem";
import Map from "../components/auth/Map";
import RentalHistory from "../components/History/RentalHistory";
import UserProfile from "../components/auth/UserProfile";
import Dashboard from "../components/AdminPage/Dashboard";
import DetailProfile from "../components/auth/DetailProfile";
export const routes = [

  {
    path: "/map/:lat/:lon",
    private: false,
    // name: "Map",
    component: Map
  },
  {
    path: "/rentalHistory",
    private: false,
    name: "History",
    component: RentalHistory
  },
  {
    path: "/item/:id",
    private: false,
    // name: "Item",
    component: ItemPage,
  },
  {
    path: "/detailprofile/:userid",
    private: false,
    component: DetailProfile,
  },
  {
    path: "/addItem",
    private: false,
    name: "Add Item",
    component: AddItem
  },
  {
    path: "/login",
    private: false,
    name: "Login",
    component: SignIn,
  },
  {
    path: "/userprofile",
    private: false,
    name: "Profile",
    component: UserProfile,
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
    path: "/adminPage",
    private: false,
    name: "Admin Page",
    component: Dashboard
  },
  {
    path: "/",
    private: false,
    component: Home
  },

]

