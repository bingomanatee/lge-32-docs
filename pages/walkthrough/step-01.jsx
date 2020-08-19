import Layout from "../../components/Layout";
import Head   from "next/head";

export default () =>(
<Layout >
  <Head>
    <title>LGE walkthrough: page 1</title>
  </Head>
  <article>
    <h1>Walkthrough: first step, login/signup a la Firebase</h1>
    <p>We're sing Firebase auth to log in; so lets create a client site store that helps manage the
    state around both activities. First, we'll create a sign-up page that takes a user name and a password.</p>
    <p>These fields require a particular format: the email must be mail formatted, and the password must be of a certain length and complexity</p>
  </article>
</Layout>)
