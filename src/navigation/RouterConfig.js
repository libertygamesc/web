import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "navigation/NotFound";
import { ROOT, LOGIN, REGISTER, CHARACTERS, KIT, SHOP, DONATE, VERIFY, VERIFY_KEY, RANKINGS, DOWNLOADS, PASSWORD, SPIN, LAUNCHER, PASS, VIDEOS, SHOP_WAR, MERCADO_PAGO, PIX, DAILY, VERIFY_CUPOM, PANEL, REGISTER_REFER, MISSION_DAILY, VIP, SHOP_BONUS, LOTTERY, ACCOUNT, INFINITES } from "navigation/CONSTANTS";
import Home from "pages/Home";
import MiniDrawer from "layout/MiniDrawer";
import Login from "pages/Login";
import Register from "pages/Register";
import Characters from "pages/Characters";
import Kit from "pages/Kit";
import Shop from "pages/Shop";
import Donate from "pages/Donate";
import Verify from "pages/Verify";
import Rankings from "pages/Rankings";
import Downloads from "pages/Downloads";
import Password from "pages/Password";
import Spin from "pages/Spin";
import Pass from "pages/Pass";
import Videos from "pages/Videos";
import MercadoPago from "pages/MercadoPago";
import Pix from "pages/Pix/index";
import NewLayout from "layout/NewLayout";
import Daily from "pages/Daily";
import Cupom from "pages/Cupom";
import Vip from "pages/Vip";
import ShopBonus from "pages/ShopBonus";
import Lottery from "pages/Lottery";
import Account from "pages/Account";
import Panel from "pages/Panel";

export const RouterConfig = () => {
  return (
    <div>
      <Routes>
        <Route path={ROOT} element={<NewLayout />}>
          <Route index element={<Home />} />
          <Route path={LOGIN} element={<Login />} />
          <Route path={REGISTER} element={<Register />} />
          <Route path={REGISTER_REFER} element={<Register />} />
          <Route path={ACCOUNT} element={<Account />} />
          <Route path={CHARACTERS} element={<Characters />} />
          <Route path={KIT} element={<Kit />} />
          <Route path={SHOP} element={<Shop />} />
          <Route path={SHOP_BONUS} element={<ShopBonus />} />
          <Route path={DONATE} element={<Donate />} />
          <Route path={VERIFY} element={<Verify />} />
          <Route path={VERIFY_KEY} element={<Verify />} />
          <Route path={VERIFY_CUPOM} element={<Cupom />} />
          <Route path={RANKINGS} element={<Rankings />} />
          <Route path={DOWNLOADS} element={<Downloads />} />
          <Route path={PASSWORD} element={<Password />} />
          <Route path={PANEL} element={<Panel />} />
          <Route path={SPIN} element={<Spin />} />
          <Route path={PASS} element={<Pass />} />
          <Route path={VIDEOS} element={<Videos />} />
          <Route path={MERCADO_PAGO} element={<MercadoPago />} />
          <Route path={PIX} element={<Pix />} />
          <Route path={DAILY} element={<Daily />} />
          <Route path={VIP} element={<Vip />} />
          <Route path={LOTTERY} element={<Lottery />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};
