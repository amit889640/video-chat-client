import { Routes, Route } from "react-router-dom";
import "./App.css";
import LobbyScreen from "./pages/lobby/Lobby";
import RoomPage from "./pages/room/Room";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LobbyScreen />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
    </div>
  );
}

export default App;
