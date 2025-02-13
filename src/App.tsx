import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RootLayout } from "./layouts/root-layout";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "sonner";
import Home from "./pages/home";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import MyListWorkspace from "./pages/my-list-workspace";
import MyVocabulary from "./pages/my-vocabulary";
import ChatboxPage from "./pages/chatbox";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/my-list-workspace" element={<MyListWorkspace />} />
            <Route path="/my-vocabulary" element={<MyVocabulary />} />
            <Route path="/chatbox" element={<ChatboxPage />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
        <Toaster position="top-center" />
      </Router>
    </AuthProvider>
  );
}
