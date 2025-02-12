import useGoogleAuth from "./Hooks/useGoogleAuth";
import HomePage from "./Pages/HomePage/HomePage";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SignInPage from "./Pages/SignInPage/SignInPage";
import IndexPage from "./Pages/IndexPage/IndexPage";
import RedirectToLogin from "./Components/RedirectToLogin";
import Layout from "./Components/Layout";

function App() {

  const { runWithAuth, login } = useGoogleAuth()

  return (
    <BrowserRouter>
      <RedirectToLogin />
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path="login" element={<SignInPage />} />
        <Route path="home" element={<HomePage runWithAuth={runWithAuth} />} />
        <Route path="friends" element={
          <>
            <Layout />
            prieteni
          </>
        } />
        <Route path="projects" element={
          <>
            <Layout />
            proiecte
          </>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
