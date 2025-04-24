import "./api/axiosConfig";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import "./styles/Global.css"; 

function App() {
  return (
    <div className="app-wrapper">
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
