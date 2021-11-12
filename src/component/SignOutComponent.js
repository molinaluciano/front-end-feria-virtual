import "bootstrap/dist/css/bootstrap.min.css";
function SignOutComponent() {
  const signOut = () => {
    localStorage.removeItem("PROFILE");
    localStorage.removeItem("IDUSER");
    window.location.href = "/";
  };

  return (
    <button type="button" onClick={signOut} className="btn btn-primary">
      Cerrar Sesion
    </button>
  );
}

export default SignOutComponent;
