import { Routes, Route } from "react-router"
import { AppSidebar } from "./components/layout/AppSidebar"
import { AppHeader } from "./components/layout/AppHeader"
import { SidebarProvider } from "./components/ui/sidebar"
import { Toaster } from "sonner"

import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import Categories from "./pages/Categories"

export default function App() {
    return (
        <>
            <SidebarProvider>

                <AppSidebar />

                <div className="flex min-h-svh min-w-0 flex-1 flex-col bg-background">

                    <AppHeader />

                    <div className="flex-1">

                        <Routes>
                            <Route
                                path="/"
                                element={<Dashboard />}
                            />

                            <Route
                                path="/transactions"
                                element={<Transactions />}
                            />

                            <Route
                                path="/categories"
                                element={<Categories />}
                            />
                        </Routes>

                    </div>

                </div>

            </SidebarProvider>

            <Toaster
                position="top-right"
                richColors
                closeButton
                duration={4000}
            />
        </>
    )
}