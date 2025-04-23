import { useAuth } from 'react-oidc-context'
import { Button } from '../components/ui/button'
import { LogIn, LogOut, User } from 'lucide-react'
import { useEffect } from 'react'

const PublicPage = () => {
  const auth = useAuth()

  useEffect(() => {
    // Listen for storage events from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'sso_logout' && auth.isAuthenticated) {
        auth.removeUser()
        auth.signoutRedirect()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [auth])

  const handleLogout = () => {
    // Trigger logout in current tab
    localStorage.setItem('sso_logout', Date.now().toString())
    auth.removeUser()
    auth.signoutRedirect()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Welcome to SSO Example</h1>
          <p className="text-gray-500 dark:text-gray-400">Sign in to access your dashboard</p>
        </div>

        <div className="space-y-4">
          {auth.isAuthenticated ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300">
                <User className="h-5 w-5" />
                <span>{auth.user?.profile.name}</span>
              </div>
              <Button variant="destructive" className="w-full" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <Button className="w-full" onClick={() => auth.signinRedirect()}>
              <LogIn className="mr-2 h-4 w-4" />
              Login with SSO
            </Button>
          )}
        </div>

        {auth.isLoading && <div className="text-center text-sm text-gray-500 dark:text-gray-400">Loading...</div>}

        {auth.error && <div className="text-center text-sm text-red-500">Error: {auth.error.message}</div>}
      </div>
    </div>
  )
}

export default PublicPage
