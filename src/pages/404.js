/** @jsx jsx */
import { jsx } from "theme-ui"
import { Layout, SEO } from "../components/"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1 sx={{ mt: 5, mb: 0 }}> Down Not Found</h1>
    <p sx={{ mt: 0, mb: 5 }}>We couldn't find the down you were looking for.</p>
  </Layout>
)

export default NotFoundPage
