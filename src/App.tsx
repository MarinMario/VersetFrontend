import HomePage from "./Pages/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./Pages/SignInPage/SignInPage";
import RedirectToLogin from "./Components/RedirectToLogin";
import Layout from "./Components/Layout";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import IndexPage from "./Pages/IndexPage/IndexPage";
import ProjectsPage from "./Pages/ProjectsPage/ProjectsPage";
import EditorPage from "./Pages/EditorPage/EditorPage";

function App() {

  return (
    <BrowserRouter>
      <RedirectToLogin />
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path="login" element={<SignInPage />} />
        <Route path="feed" element={<HomePage />} />
        <Route path="notifications" element={<Layout>Notificari</Layout>} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="editor/*" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
