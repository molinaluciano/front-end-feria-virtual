import { BrowserRouter, Switch, Route } from "react-router-dom";
import MenuAdministrator from "./page/administrador/MenuAdministrador";
import MenuTransportista from "./page/transportista/MenuTransportista";
import MenuConsultor from "./page/consultor/MenuConsultor";
import MenuProductor from "./page/productor/MenuProductor";
import MenuClienteExterno from "./page/clientes/MenuClienteExterno";
import MenuClienteInterno from "./page/clientes/MenuClienteInterno";
import MenuClienteLocal from "./page/clientes/MenuClienteLocal";
import Login from "./page/general/Login";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/administrador" component={MenuAdministrator} />
        <Route exact path="/transportista" component={MenuTransportista} />
        <Route exact path="/cliente_externo" component={MenuClienteExterno} />
        <Route exact path="/cliente_interno" component={MenuClienteInterno} />
        <Route exact path="/cliente_local" component={MenuClienteLocal} />
        <Route exact path="/consultor" component={MenuConsultor} />
        <Route exact path="/productor" component={MenuProductor} />
        <Route exact path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
