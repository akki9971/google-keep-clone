import "./App.css";
import { Auth, Navbar } from "./components";
import { Archieve, EditLabels, Home, MainLayout, Notes, Reminder, SS,TrashBin } from "./components/main";
import { Provider } from "react-redux"
import { appStore } from "./redux/Store"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<><Navbar /><Home /></>}>
              <Route path="/" element={<MainLayout />}>
                <Route path="/" element={<Notes />} />
                <Route path="/reminder" element={<Reminder />} />
                <Route path="/ss" element={<SS />} />
                <Route path="/editlabel" element={<EditLabels />} />
                <Route path="/archieve" element={<Archieve />} />
              </Route>
              <Route path="/bin" element={<TrashBin />} />
            </Route>
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
