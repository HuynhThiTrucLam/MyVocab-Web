import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { AuthProvider } from "@/contexts/auth-context";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import MyListWorkspace from "./pages/MyListWorkspace";
import WorkspaceDetails from "./pages/WorkspaceDetails";
import Dictionary from "./pages/Dictionary";
import Home from "./pages/Home";
import Translation from "./pages/Translation";
import { ScrollToTopProvider } from "./providers/ScrollToTopProvider";
import { Toaster } from "@/components/ui/toaster";
import { Chatbox } from "./pages/Chatbox/Chatbox";
import Exams from "./pages/Exams/Exams";
import TestingIntro from "./features/listening-exam/components/testing/TestingIntro";
import ResultIntro from "./features/listening-exam/components/result/ResultIntro";
import Flashcard from "./pages/Flashcard";
import TestPage from '@/pages/Test'; // Đảm bảo đường dẫn đúng



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
              <Route path="/flashcard/:workspaceId" element={<Flashcard />} />
              <Route path="/chatbox" element={<Chatbox />} />
              <Route path="/dictionary" element={<Dictionary />} />
              <Route path="/exams" element={<Exams />} />
              <Route path="/testing/:id" element={<TestingIntro />} />
              <Route path="/result/:id" element={<ResultIntro />} />
              <Route path="/translation" element={<Translation />} />
              <Route path="/test/:workspaceId" element={<TestPage />} />
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
