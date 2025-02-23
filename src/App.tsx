import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { AuthProvider } from "@/contexts/auth-context";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import MyListWorkspace from "./pages/MyListWorkspace";
import WorkspaceDetails from "./pages/WorkspaceDetails";
import Dictionary from "./pages/Dictionary";
import Home from "./pages/Home";
import { ScrollToTopProvider } from "./providers/ScrollToTopProvider";
import { Chatbox } from "./pages/Chatbox/Chatbox";
import { Toaster } from "sonner";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTopProvider>
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
          <Toaster />
        </ScrollToTopProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}
