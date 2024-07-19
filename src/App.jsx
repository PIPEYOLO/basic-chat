import { BrowserRouter, Route, Routes} from "react-router-dom";
import './output.css';
import JoinRoom from "./pages/JoinRoom";
import Room from "./pages/Room";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/join-room" element={<JoinRoom />} />
                <Route path="/room" element={<Room />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
