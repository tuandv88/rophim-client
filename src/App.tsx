import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "./components/feedback/ErrorBoundary";
import { AppRouter } from "./routes/AppRouter";

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
