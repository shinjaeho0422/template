import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import UploadProductPage from "./views/UploadProductPage/UploadProductPage.js";
import DetailProductPage from "./views/DetailProductPage/DetailProductPage";
import CartPage from './views/CartPage/CartPage';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />                      {/* 기본값 경로 */}
          <Route exact path="/login" component={Auth(LoginPage, false)} />                  {/* 로그인페이지 경로 */}
          <Route exact path="/register" component={Auth(RegisterPage, false)} />            {/* 레지스터페이지 경로*/}
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />   {/* 업로드페이지 경로*/}
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} /> {/* 상세정보페이지 경로*/}
          <Route exact path="/user/cart" component={Auth(CartPage, true)} />          {/* 장바구니페이지 경로 */} 
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
