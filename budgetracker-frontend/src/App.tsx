import "./App.css";
import Dashboard from "./components/Dashboard";
import ApiService from "./service/ApiService";

function App() {
  ApiService.setJwtToken(
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5ODIzNTkxMywiZXhwIjoxNjk4MjM5NTEzfQ.lgqGQshmc1Ckewzprw24-YDsgOT1bTiqG7B6LTiv22g"
  );
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
