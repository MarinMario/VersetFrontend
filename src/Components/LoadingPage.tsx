import Layout from "./Layout";
import { LoadingCircle } from "./Loading";

function LoadingPage() {

  return (
    <Layout>
      <div className="center">
        <LoadingCircle />
      </div>
    </Layout>
  )
}

export default LoadingPage