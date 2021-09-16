import "bootstrap/dist/css/bootstrap.min.css";
function MenuConsultant() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>Panel de Consultor</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <a href="#" className="list-group-item list-group-item-action">
            Generar reporte
          </a>
          <hr />
          <a href="#" className="list-group-item list-group-item-action">
            Cerrar Sesion
          </a>
        </li>
      </ul>
    </div>
  );
}

export default MenuConsultant;
