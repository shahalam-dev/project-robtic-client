import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AboutSec from "./components/AboutSec/AboutSec";
import AddReview from "./components/AddReview/AddReview";
import Banner from "./components/Banner/Banner";
import CartPage from "./components/CartPage/CartPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import HomePdSec from "./components/HomePdSec/HomePdSec";
import InsertProduct from "./components/InsertProduct/InsertProduct";
import LogInForm from "./components/LogInForm/LogInForm";
import ManageOrder from "./components/ManageOrder/ManageOrder";
import ManageUser from "./components/ManageUser/ManageUser";
import MyProfile from "./components/MyProfile/MyProfile";
import Nav from "./components/Nav/Nav";
import Payment from "./components/Payment/Payment";
import PdGallery from "./components/PdGallery/PdGallery";
import PdPage from "./components/PdPage/PdPage";
import RequireAdmin from "./components/RequireAdmin/RequireAdmin";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import ReviewSec from "./components/ReviewSec/ReviewSec";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import Stat from "./components/Stat/Stat";

function App() {
  return (
    <div className="container mx-auto relative">
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner></Banner>
              <Stat></Stat>
              <HomePdSec></HomePdSec>
              <ReviewSec></ReviewSec>
              <AboutSec></AboutSec>
              <div style={{ marginTop: "200px" }}></div>
            </>
          }
        />
        <Route path="/all-product" element={<PdGallery />} />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<MyProfile />} />
          <Route path="add-review" element={<AddReview />} />
          <Route path="cart" element={<CartPage />} />

          <Route
            path="all-user"
            element={
              <RequireAdmin>
                <ManageUser />
              </RequireAdmin>
            }
          />
          <Route
            path="all-order"
            element={
              <RequireAdmin>
                <ManageOrder />
              </RequireAdmin>
            }
          />
          <Route
            path="add-product"
            element={
              <RequireAdmin>
                <InsertProduct />
              </RequireAdmin>
            }
          />
        </Route>

        <Route path="/register" element={<SignUpForm />} />
        <Route path="/login" element={<LogInForm />} />
        <Route
          path="/add-item"
          element={
            <RequireAuth>
              <RequireAdmin>
                <Route path="/admin-dashboard" element={<Dashboard />}>
                  <Route index element={<MyProfile />} />
                  <Route path="all-user" element={<ManageUser />} />
                  <Route path="all-order" element={<ManageOrder />} />
                  <Route path="add-product" element={<InsertProduct />} />
                </Route>
              </RequireAdmin>
            </RequireAuth>
          }
        />
        <Route
          path="/payment/:id"
          element={
            <RequireAuth>
              <Payment />
            </RequireAuth>
          }
        />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <CartPage />
            </RequireAuth>
          }
        />
        <Route
          path="/all-users"
          element={
            <RequireAuth>
              <ManageUser />
            </RequireAuth>
          }
        />
        <Route
          path="/pd-detail/:id"
          element={
            <RequireAuth>
              <PdPage />
            </RequireAuth>
          }
        />
      </Routes>
      <ToastContainer autoClose={8000} />
      <div className="mt-24"></div>
      <Footer></Footer>
    </div>
  );
}

export default App;
