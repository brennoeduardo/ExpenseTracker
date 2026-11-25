import { ChevronRight, House } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router"

const pageNames: Record<string, string> = {
    "/": "Dashboard",
    "/transactions": "Transações",
    "/categories": "Categorias"
}

export function AppHeader() {
    const { pathname } = useLocation()

    const currentPage = pageNames[pathname] ?? "Página"

    return (
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur-md md:px-6">

            <div className="flex items-center gap-3">

                <SidebarTrigger className="size-8 cursor-pointer rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground" />

                <div className="h-6 w-px bg-border" />

                <nav
                    aria-label="Breadcrumb"
                    className="flex items-center gap-2 text-sm"
                >
                    <Link
                        to="/"
                        aria-label="Página inicial"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <House size={16} />
                    </Link>

                    <ChevronRight
                        size={14}
                        className="text-muted-foreground/50"
                    />

                    <span
                        aria-current="page"
                        className="font-medium text-foreground"
                    >
                        {currentPage}
                    </span>
                </nav>

            </div>

        </header>
    )
}