import { BrowserRouter, Switch, Route } from "react-router-dom";
import MenuAdministrator from "./page/administrator/MenuAdministrator";
import MenuCarrier from "./page/carrier/MenuCarrier";
import MenuConsultant from "./page/consultant/MenuConsultant";
import MenuCustomer from "./page/customer/MenuCustomer";
import Login from "./page/general/Login";
import MenuProducer from "./page/producer/MenuProducer";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/administrator" component={MenuAdministrator} />
        <Route exact path="/carrier" component={MenuCarrier} />
        <Route exact path="/customer" component={MenuCustomer} />
        <Route exact path="/consultant" component={MenuConsultant} />
        <Route exact path="/producer" component={MenuProducer} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
