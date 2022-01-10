import './App.css';
import Navbar from "./components/navbar";
import Dashboard from "./layouts/dashboard";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {BloodPressure} from "./layouts/blood-pressure";
import {EcgAnalysis} from "./layouts/ecg-analysis";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar/>}>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path={"/blood-pressure"} element={<BloodPressure/>}/>
                    <Route path={"/ecg-analysis"} element={<EcgAnalysis />}/>
                    <Route path={"/"} element={<Dashboard/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
