import { SupabaseUser } from 'src/types/main'
import { supabase } from '@utils/supabaseClient'
import Layout from '@components/Layout'

const TestPage = ({ user }: { user: SupabaseUser }) => {
  return (
    <Layout>
      <h1>Test Page</h1>
      <h2>Hello, {user.first_name}</h2>
    </Layout>
  )
}

export default TestPage

export const getServerSideProps = async () => {
  const { data } = await supabase.from('users').select('*').eq('first_name', 'Martin').single()

  return {
    props: {
      user: data,
    },
  }
}
