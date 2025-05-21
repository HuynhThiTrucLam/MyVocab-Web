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
import { Toaster } from "@/components/ui/toaster";
import { Chatbox } from "./pages/ChatBox/Chatbox";
import Exams from "./pages/Exams/Exams";
import TestingIntro from "./features/listening-exam/components/testing/TestingIntro";

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
              <Route path="/exams" element={<Exams />} />
              <Route path="/testing/:id" element={<TestingIntro />} />
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
