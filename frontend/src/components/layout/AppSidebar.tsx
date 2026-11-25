import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"

import {
    ArrowLeftRight,
    ChartSpline,
    LayoutGrid,
    Wallet,
} from "lucide-react"

import { Link, useLocation } from "react-router"

const navigation = [
    {
        title: "Dashboard",
        url: "/",
        icon: ChartSpline,
    },
    {
        title: "Transações",
        url: "/transactions",
        icon: ArrowLeftRight,
    },
    {
        title: "Categorias",
        url: "/categories",
        icon: LayoutGrid,
    },
]

export function AppSidebar() {
    const { pathname } = useLocation()

    return (
        <Sidebar className="border-r border-sidebar-border">

            <SidebarHeader className="p-5">
                <div className="flex items-center gap-3">

                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                        <Wallet className="size-5" />
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm font-semibold tracking-tight">
                            ExpenseTracker
                        </span>

                        <span className="text-xs text-muted-foreground">
                            Personal Finance
                        </span>
                    </div>

                </div>
            </SidebarHeader>

            <SidebarSeparator />

            <SidebarContent className="px-2 py-3">

                <SidebarGroup>

                    <SidebarGroupLabel className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Gerenciamento
                    </SidebarGroupLabel>

                    <SidebarGroupContent>

                        <SidebarMenu className="gap-1.5">

                            {navigation.map((item) => (
                                <SidebarMenuItem key={item.url}>

                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        className="
                                            h-11 gap-3 rounded-lg px-3
                                            text-muted-foreground
                                            transition-colors duration-200
                                            hover:bg-sidebar-accent
                                            hover:text-sidebar-accent-foreground
                                            data-[active=true]:bg-blue-500/10
                                            data-[active=true]:text-blue-600
                                            data-[active=true]:font-medium
                                            dark:data-[active=true]:text-blue-400
                                        "
                                    >
                                        <Link to={item.url}>

                                            <item.icon className="size-[18px]" />

                                            <span>{item.title}</span>

                                            {pathname === item.url && (
                                                <span className="ml-auto h-5 w-0.5 rounded-full bg-blue-500" />
                                            )}

                                        </Link>
                                    </SidebarMenuButton>

                                </SidebarMenuItem>
                            ))}

                        </SidebarMenu>

                    </SidebarGroupContent>

                </SidebarGroup>

            </SidebarContent>

            <SidebarSeparator />

            <SidebarFooter className="p-4">

                <div className="flex items-center gap-3 rounded-lg p-2">

                    <Wallet className="size-5 text-muted-foreground" />

                    <div className="flex flex-col">
                        <span className="text-xs font-medium">
                            ExpenseTracker
                        </span>
                    </div>

                </div>

            </SidebarFooter>

        </Sidebar>
    )
}