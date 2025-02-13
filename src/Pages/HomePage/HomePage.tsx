import Layout from "../../Components/Layout"
import { Authorization } from "../../Utils/Authorization"
import "./HomePage.css"

interface HomePageProps {
  runWithAuth: (run: (auth: Authorization) => void) => void
}

function HomePage(props: HomePageProps) {

  return (
    <Layout>
      home page
    </Layout>
  )
}

export default HomePage