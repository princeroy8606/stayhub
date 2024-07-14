import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthRoute from "./routes/AuthRoute";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AuthProvider } from "./context/authContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@mui/material/styles";
import { customTheme } from "./utils/mui/theme";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Router>
            <AuthProvider>
              <AuthRoute />
              <ToastContainer />
            </AuthProvider>
          </Router>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
