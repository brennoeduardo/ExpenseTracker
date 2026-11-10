import { Routes, Route } from 'react-router'
import { AppSidebar } from './components/layout/AppSidebar'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import { Toaster } from 'sonner'

import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Categories from './pages/Categories'

export default function App() {
    return (
        <>
            <>
                <SidebarProvider>
                    <AppSidebar />

                    <main>
                        <SidebarTrigger />
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/transactions" element={<Transactions />} />
                            <Route path="/categories" element={<Categories />} />
                        </Routes>
                    </main>
                </SidebarProvider>
                <Dashboard />
            </>
            <Toaster position="top-right" richColors />
        </>
    )
}