import { Route } from "@solidjs/router";
import Lobby from "./pages/lobby";
import Welcome from "./pages/welcome";

function App() {
    /**
     * Shift + D to toggle debug mode
     */
    document.addEventListener("keyup", (e) => {
        if (e.shiftKey && e.code === "KeyD") {
            const debug = document.documentElement.getAttribute("debug");
            console.log("debug:", debug);
            if (debug !== null)
                document.documentElement.removeAttribute("debug");
            else document.documentElement.setAttribute("debug", "");
        }
    });
    return (
        <>
            <Route path="/" component={Welcome} />
            <Route path="/lobby" component={Lobby} />
        </>
    );
}

export default App;
