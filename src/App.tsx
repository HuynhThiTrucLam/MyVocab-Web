import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RootLayout } from "./layouts/root-layout";
import { AuthProvider } from "@/contexts/auth-context";
import Home from "./pages/home";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import MyListWorkspace from "./pages/my-workspace";
import ChatboxPage from "./pages/chatbox";
import WorkspaceDetails from "./pages/workspace-details";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/my-vocab" element={<MyListWorkspace />} />
            <Route path="/my-vocab/:title" element={<WorkspaceDetails />} />
            <Route path="/chatbox" element={<ChatboxPage />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
