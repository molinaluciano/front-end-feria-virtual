/* ==== GENERAL ===== */
import Login from './page/general/Login';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
/* ==== ADMINISTRADOR ===== */
import MenuAdministrator from './page/administrador/MenuAdministrador';
import MenuGestionarUsuarios from './page/administrador/gestionar-usuarios/MenuGestionarUsuarios';
import GestionarClientes from './page/administrador/gestionar-usuarios/gestionar-clientes/GestionarClientes';
import GestionarProductores from './page/administrador/gestionar-usuarios/gestionar-productores/GestionarProductores';
import GestionarVentas from './page/administrador/gestionar-ventas/MenuGestionarVentas';
import GestionarTransportistas from './page/administrador/gestionar-usuarios/gestionar-transportistas/GestionarTransportistas';
import NuevoCliente from './page/administrador/gestionar-usuarios/gestionar-clientes/NuevoCliente';
import EditarCliente from './page/administrador/gestionar-usuarios/gestionar-clientes/EditarCliente';
import NuevoProductor from './page/administrador/gestionar-usuarios/gestionar-productores/NuevoProductor';
import NuevoTransportista from './page/administrador/gestionar-usuarios/gestionar-transportistas/NuevoTransportista';
import AceptarSolicitudes from './page/administrador/gestionar-ventas/aceptar-solicitudes-de-compra/AceptarSolicitudesDeCompra';

/* ==== TRANSPORTISTA ===== */
import MenuTransportista from './page/transportista/MenuTransportista';
import MisCamiones from './page/transportista/gestionar-camiones/MisCamiones';
import AgregarCamion from './page/transportista/gestionar-camiones/AgregarCamion';
import MisSubastas from './page/transportista/gestionar-subastas/mis-subastas/MisSubastas';
import GestionarSubastasTransportista from './page/transportista/gestionar-subastas/MenuGestionarSubastas';
// import DetalleSubasta from "./page/transportista/gestionar-subastas/mis-subastas/DetalleSubasta";
import ParticiparSubasta from './page/transportista/gestionar-subastas/participar-subasta/ParticiparSubasta';
import SubastasDisponibles from './page/transportista/gestionar-subastas/participar-subasta/SubastasDisponibles';

/* ==== CLIENTE EXTERNO ===== */
import MisCompras from './page/clientes/cliente_externo/MisCompras';
import CrearSolicitud from './page/clientes/cliente_externo/CrearSolicitud';

/* ==== CLIENTE INTERNO ===== */
import MenuClienteInterno from './page/clientes/cliente_interno/MenuClienteInterno';

/* ==== CLIENTE LOCAL ===== */
import MenuClienteLocal from './page/clientes/cliente_local/MenuClienteLocal';

/* ==== CONSULTOR ===== */
import MenuConsultor from './page/consultor/MenuConsultor';

/* ==== PRODUCTOR ===== */
import MenuProductor from './page/productor/MenuProductor';
import MisSolicitudes from './page/productor/gestionar_solicitudes_venta/MisSolicitudes';
import SolicitudesDisponibles from './page/productor/participar_solicitudes_venta/SolicitudesDisponibles';
import DetalleSolicitudDisponible from './page/productor/participar_solicitudes_venta/DetalleSolicitudDisponible';
import GestionarSaldos from './page/administrador/gestionar-saldos/GestionarSaldos';
import ListSaldos from './page/administrador/gestionar-saldos/ListSaldos';
import NuevoSaldo from './page/administrador/gestionar-saldos/NuevoSaldo';
// COMPONENTE GENERAL CLIENTE
import MenuHistorial from './component/historialClientes/MenuHistorial';
import HistorialSolicitudes from './component/historialClientes/HistorialSolicitudes';
import HistorialVentas from './component/historialClientes/HistorialVentas';
import DetalleSolicitudes from './component/historialClientes/DetalleSolicitudes';
import ComprarSaldosDisponibles from './page/clientes/cliente_interno/ComprarSaldosDisponibles';
import ListSaldosComprados from './page/clientes/cliente_interno/ListSaldosComprados';
import ControlarSolicitudes from './page/administrador/gestionar-ventas/controlar-solicitudes/ControlarSolicitudes';
import ControlarVentas from './page/administrador/gestionar-ventas/controlar-ventas/ControlarVentas';
import GestionarPagos from './page/administrador/gestionar-ventas/gestionar-pagos/GestionarPagos';
// import GestionarSubastasProductor from "./page/transportista/gestionar-subastas/GestionarSubastasProductor";

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {/* ==== ADMINISTRADOR ===== */}
                <Route
                    exact
                    path='/administrador'
                    component={MenuAdministrator}
                />
                <Route
                    exact
                    path='/administrador/gestionar-usuarios'
                    component={MenuGestionarUsuarios}
                />
                <Route
                    exact
                    path='/administrador/gestionar-usuarios/gestionar-clientes'
                    component={GestionarClientes}
                />
                <Route
                    exact
                    path='/administrador/gestionar-usuarios/gestionar-productores'
                    component={GestionarProductores}
                />
                <Route
                    exact
                    path='/administrador/gestionar-usuarios/gestionar-transportistas'
                    component={GestionarTransportistas}
                />
                <Route
                    exact
                    path='/administrador/gestionar-usuarios/gestionar-clientes/nuevo-cliente'
                    component={NuevoCliente}
                />
                <Route
                    exact
                    path='/administrador/gestionar-usuarios/gestionar-clientes/editar-cliente'
                    component={EditarCliente}
                />
                <Route
                    exact
                    path='/administrador/gestionar-usuarios/gestionar-productores/nuevo-productor'
                    component={NuevoProductor}
                />
                <Route
                    exact
                    path='/administrador/gestionar-usuarios/gestionar-transportistas/nuevo-transportista'
                    component={NuevoTransportista}
                />
                <Route
                    exact
                    path='/administrador/gestionar-ventas'
                    component={GestionarVentas}
                />
                <Route
                    exact
                    path='/administrador/gestionar-ventas/aceptar-solicitudes'
                    component={AceptarSolicitudes}
                />
                <Route
                    exact
                    path='/administrador/gestionar-saldos'
                    component={GestionarSaldos}
                />
                <Route
                    exact
                    path='/administrador/gestionar-saldos/nuevo-saldo'
                    component={NuevoSaldo}
                />
                <Route
                    exact
                    path='/administrador/gestionar-saldos/historial'
                    component={ListSaldos}
                />
                <Route
                    exact
                    path='/administrador/gestionar-ventas/controlar_solicitudes'
                    component={ControlarSolicitudes}
                />

                <Route
                    exact
                    path='/administrador/gestionar-ventas/controlar_solicitudes/:idSolicitud'
                    component={DetalleSolicitudes}
                />
                <Route
                    exact
                    path='/administrador/gestionar-ventas/controlar_ventas'
                    component={ControlarVentas}
                />
                <Route
                    exact
                    path='/administrador/gestionar-ventas/gestionar_pagos'
                    component={GestionarPagos}
                />

                {/* ==== TRANSPORTISTA ===== */}
                <Route
                    exact
                    path='/transportista'
                    component={MenuTransportista}
                />
                <Route
                    exact
                    path='/transportista/gestionar-camiones/mis-camiones'
                    component={MisCamiones}
                />
                <Route
                    exact
                    path='/transportista/gestionar-camiones/mis-camiones/agregar-camion'
                    component={AgregarCamion}
                />
                <Route
                    exact
                    path='/transportista/gestionar-subastas'
                    component={GestionarSubastasTransportista}
                />
                <Route
                    exact
                    path='/transportista/gestionar-subastas/mis-subastas'
                    component={MisSubastas}
                />
                <Route
                    exact
                    path='/transportista/gestionar-subastas/participar-subastas'
                    component={SubastasDisponibles}
                />
                <Route
                    exact
                    path='/transportista/gestionar-subastas/participar-subastas/detalle-subasta/:id'
                    component={ParticiparSubasta}
                />

                {/* ==== CLIENTE EXTERNO ===== */}
                <Route exact path='/cliente_externo' component={MisCompras} />
                <Route
                    exact
                    path='/cliente_externo/crear-solicitud'
                    component={CrearSolicitud}
                />
                <Route
                    exact
                    path='/cliente/historial'
                    component={MenuHistorial}
                />
                <Route
                    exact
                    path='/cliente/historial/solicitudes'
                    component={HistorialSolicitudes}
                />
                <Route
                    exact
                    path='/cliente/historial/ventas'
                    component={HistorialVentas}
                />
                <Route
                    exact
                    path='/cliente/historial/solicitudes/:idSolicitud'
                    component={DetalleSolicitudes}
                />

                {/* ==== CLIENTE INTERNO ===== */}
                <Route
                    exact
                    path='/cliente_interno'
                    component={MenuClienteInterno}
                />
                <Route
                    exact
                    path='/cliente_interno/comprar-saldos'
                    component={ComprarSaldosDisponibles}
                />
                <Route
                    exact
                    path='/cliente_interno/historial'
                    component={ListSaldosComprados}
                />
                {/* ==== CLIENTE LOCAL ===== */}
                <Route
                    exact
                    path='/cliente_local'
                    component={MenuClienteLocal}
                />
                <Route
                    exact
                    path='/cliente_local/crear-solicitud'
                    component={CrearSolicitud}
                />

                {/* ==== CONSULTOR ===== */}
                <Route exact path='/consultor' component={MenuConsultor} />

                {/* ==== PRODUCTOR ===== */}
                <Route exact path='/productor' component={MenuProductor} />
                <Route
                    exact
                    path='/productor/gestionar-solicitudes/mis-solicitudes'
                    component={MisSolicitudes}
                />
                <Route
                    exact
                    path='/productor/participar-solicitudes/solicitudes-disponibles'
                    component={SolicitudesDisponibles}
                />
                <Route
                    exact
                    path='/productor/participar-solicitudes/detalle-solicitud/:id'
                    component={DetalleSolicitudDisponible}
                />
                <Route
                    exact
                    path='/productor/gestionar-solicitudes/:idSolicitud'
                    component={DetalleSolicitudes}
                />

                <Route exact path='/' component={Login} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
