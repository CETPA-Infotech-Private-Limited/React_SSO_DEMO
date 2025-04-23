import { useAuth } from 'react-oidc-context'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import PublicPage from './page/PublicPage'
import PrivateRoute from './routes/PrivateRoute'
import Dashboard from './page/Dashboard'

const CallbackPage = () => {
  const auth = useAuth()

  // Handle loading state
  if (auth.isLoading || auth.activeNavigator) {
    return <div>Loading...</div>
  }

  // Redirect to dashboard if authenticated
  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />
  }

  // Redirect to home if not authenticated
  return <Navigate to="/" />
}

// Main App Component
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PublicPage />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
)

export default App
