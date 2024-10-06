import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./states/index.js";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<BrowserRouter>
			<StrictMode>
				<ChakraProvider>
					<App />
				</ChakraProvider>
			</StrictMode>
		</BrowserRouter>
		,
	</Provider>
);
