import { Authorization } from "../../Utils/Authorization"
import "./HomePage.css"

interface HomePageProps {
  runWithAuth: (run: (auth: Authorization) => void) => void
}

function HomePage(props: HomePageProps) {

  return (
    <div>
      welcome to homepage
    </div>
  )
}

export default HomePage