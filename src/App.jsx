import { BrowserRouter, Route, Routes} from "react-router-dom";
import './output.css';
import JoinRoom from "./pages/JoinRoom";
import Room from "./pages/Room";
import Home from "./pages/Home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/join-room" element={<JoinRoom />} />
            <Route path="/room" element={<Room />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
