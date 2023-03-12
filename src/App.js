import Main from "./pages/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./pages/Game";
function App() {
    return (
        // <>
        //     <Router>
        //         <Routes>
        //             <Route path="/" element={<Main />} />
        //         </Routes>
        //     </Router>
        // </>
        // <Main />
        <Game player1Name="sam" player2Name="rey" setInGame="true" />
    );
}

export default App;
