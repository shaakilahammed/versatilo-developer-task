// Component Imports
import { cookies } from 'next/headers'

import { redirect } from 'next/navigation'

import Login from '@views/Login'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata = {
  title: 'Login',
  description: 'Login to your account'
}

const LoginPage = async () => {
  const cookieStore = await cookies()
  const access_token = cookieStore.get('access_token')

  if (access_token) {
    redirect('/home')
  }

  // Vars
  const mode = getServerMode()

  return <Login mode={mode} />
}

export default LoginPage
