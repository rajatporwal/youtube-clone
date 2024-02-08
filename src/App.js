import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Searchbar from "./components/Searchbar/Searchbar";
import Results from "./components/Results/Results";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Searchbar searchChangeHandler={(text) => window.location.replace(`results?search_query=${text}`)} />
        <Routes>
          <Route path="/" element={<Results />} />
          <Route path="results" element={<Results />} />
          <Route path="watch" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
