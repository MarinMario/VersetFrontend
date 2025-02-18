import Layout from "./Layout"
import Error from "./Error"

export function PageNotFound() {
  return <ErrorPage error="Pagina nu exista." />
}

function ErrorPage(props: { error: string }) {

  return (
    <Layout>
      <div className="center">
        <Error text={props.error} />
      </div>
    </Layout>
  )
}

export default ErrorPage