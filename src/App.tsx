import HomePage from "./Pages/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./Pages/SignInPage/SignInPage";
import RedirectToLogin from "./Components/RedirectToLogin";
import Layout from "./Components/Layout";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import IndexPage from "./Pages/IndexPage/IndexPage";

function App() {

  return (
    <BrowserRouter>
      <RedirectToLogin />
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path="login" element={<SignInPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="friends" element={<Layout>prieteni</Layout>} />
        <Route path="projects" element={<Layout>proiecte</Layout>} />
        <Route path="profile" element={<ProfilePage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
