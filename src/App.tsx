import HomePage from "./Pages/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./Pages/SignInPage/SignInPage";
import RedirectToLogin from "./Components/RedirectToLogin";
import Layout from "./Components/Layout";
import MyProfilePage from "./Pages/MyProfilePage/MyProfilePage";
import IndexPage from "./Pages/IndexPage/IndexPage";
import ProjectsPage from "./Pages/ProjectsPage/ProjectsPage";
import EditorPage from "./Pages/EditorPage/EditorPage";
import PostPage from "./Pages/PostPage/PostPage";
import { PageNotFound } from "./Components/ErrorPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";

function App() {

  return (
    <BrowserRouter>
      <RedirectToLogin />
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="login" element={<SignInPage />} />
        <Route path="discover" element={<HomePage />} />
        <Route path="notifications" element={<Layout>Notificari</Layout>} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="my-profile" element={<MyProfilePage />} />
        <Route path="editor/:id" element={<EditorPage />} />
        <Route path="user/:id" element={<EditorPage />} />
        <Route path="post/:id" element={<PostPage />} />
        <Route path="profile/:id" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
