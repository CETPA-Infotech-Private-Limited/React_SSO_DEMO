import { ReactNode } from 'react'
import { useAuth } from 'react-oidc-context'
import { Navigate } from 'react-router-dom'

interface Props {
  children: ReactNode
}

const PrivateRoute = ({ children }: Props) => {
  const auth = useAuth()

  if (auth.isLoading) return <div>Loading authentication...</div>
  if (!auth.isAuthenticated) return <Navigate to="/" />

  return <>{children}</>
}

export default PrivateRoute
