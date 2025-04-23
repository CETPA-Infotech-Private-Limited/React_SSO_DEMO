import { useAuth } from 'react-oidc-context'
import { Button } from '../components/ui/button'
import { LogOut, User, LayoutDashboard } from 'lucide-react'
import { useEffect } from 'react'

const Dashboard = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <User className="h-5 w-5" />
              <span>{auth.user?.profile.name}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Welcome Card */}
          <div className="col-span-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Welcome back, {auth.user?.profile.given_name || auth.user?.profile.name}!
            </h2>
            <p className="text-gray-500 dark:text-gray-400">You're successfully authenticated and can now access all features.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
