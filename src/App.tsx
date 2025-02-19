import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { AuthProvider } from "@/contexts/auth-context";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import MyListWorkspace from "./pages/MyListWorkspace";
import WorkspaceDetails from "./pages/WorkspaceDetails";
import { Chatbox } from "./pages/ChatBox/Chatbox";
import Dictionary from "./pages/Dictionary";
import Home from "./pages/Home";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/my-vocab" element={<MyListWorkspace />} />
            <Route path="/my-vocab/:title" element={<WorkspaceDetails />} />
            <Route path="/chatbox" element={<Chatbox />} />
            <Route path="/dictionary" element={<Dictionary />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
