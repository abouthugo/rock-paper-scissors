/* @refresh reload */
import { render } from "solid-js/web";

import { Router } from "@solidjs/router";
import App from "./App";
import AppContainer from "./components/AppContainer";
import { GameStateProvider } from "./game-state-provider";
import "./index.css";

const root = document.getElementById("root");
if (!root) throw new Error("No root element found");
render(
    () => (
        <GameStateProvider>
            <Router root={AppContainer}>
                <App />
            </Router>
        </GameStateProvider>
    ),
    root,
);
