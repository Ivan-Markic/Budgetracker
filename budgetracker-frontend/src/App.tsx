import "./App.css";
import Dashboard from "./components/Dashboard";
import ApiService from "./service/ApiService";

function App() {
  ApiService.setJwtToken(
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5ODA4MjIzNCwiZXhwIjoxNjk4MDg1ODM0fQ.rSozsF5JPoIhbUeShQjtSf6NSVYDbDwRNf9HuUHRG2Q"
  );
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
