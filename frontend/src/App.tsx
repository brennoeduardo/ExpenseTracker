import Dashboard from './pages/Dashboard'
import { Toaster } from 'sonner'

export default function App() {
    return (
        <>
            <Dashboard />
            <Toaster position="top-right" richColors />
        </>
    )
}