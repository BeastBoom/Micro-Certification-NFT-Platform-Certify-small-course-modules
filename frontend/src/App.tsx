import { Routes, Route, Navigate } from 'react-router-dom'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { useEffect } from 'react'

// Layout components
import Layout from '@components/common/Layout'

// Pages
import Home from '@pages/Home'
import Dashboard from '@pages/Dashboard'
import CreateCertification from '@pages/CreateCertification'
import MyCertifications from '@pages/MyCertifications'
import ExploreCertifications from '@pages/ExploreCertifications'

// Hooks
import { useAptos } from '@hooks/useAptos'

function App() {
  const { connected } = useWallet()
  const { initializeAptos } = useAptos()

  useEffect(() => {
    initializeAptos()
  }, [initializeAptos])

  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExploreCertifications />} />

        {/* Protected Routes - require wallet connection */}
        <Route 
          path="/dashboard" 
          element={connected ? <Dashboard /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/create" 
          element={connected ? <CreateCertification /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/my-certifications" 
          element={connected ? <MyCertifications /> : <Navigate to="/" replace />} 
        />

        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default App
