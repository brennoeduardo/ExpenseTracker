import {
    Plus,
    LayoutGrid,
    ArrowDownLeft,
    ArrowUpRight,
    Search,
    Pencil,
    Trash2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Category } from "@/types/categories"

export default function Categories() {

    const categories: Category[] = [
        { id: 1, name: "Alimentação", type: "expense", created_at: "" },
        { id: 2, name: "Transporte", type: "expense", created_at: "" },
        { id: 3, name: "Salário", type: "income", created_at: "" },
        { id: 4, name: "Moradia", type: "expense", created_at: "" },
        { id: 5, name: "Freelance", type: "income", created_at: "" },
        { id: 6, name: "Lazer", type: "expense", created_at: "" },
    ]

    return (
        <main className="w-full bg-background text-foreground">
            <div className="mx-auto max-w-7xl space-y-8 px-6 py-8 md:px-10">

                <header className="flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-center sm:justify-between">

                    <div className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                            Controle financeiro
                        </span>

                        <h1 className="text-3xl font-bold tracking-tight">
                            Categorias
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Organize suas receitas e despesas por categoria.
                        </p>
                    </div>

                    <Button className="cursor-pointer gap-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                        <Plus size={18} />
                        Nova categoria
                    </Button>

                </header>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                    <div className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-sm">
                        <div className="flex items-center justify-between">

                            <div className="flex size-11 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                <LayoutGrid size={21} />
                            </div>

                            <span className="text-3xl font-bold tabular-nums">
                                {categories.length}
                            </span>

                        </div>

                        <p className="text-sm text-muted-foreground">
                            Total de categorias
                        </p>
                    </div>

                    <div className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-sm">
                        <div className="flex items-center justify-between">

                            <div className="flex size-11 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                                <ArrowDownLeft size={21} />
                            </div>

                            <span className="text-3xl font-bold tabular-nums text-emerald-500">
                                {categories.filter(category => category.type === "income").length}
                            </span>

                        </div>

                        <p className="text-sm text-muted-foreground">
                            Categorias de receita
                        </p>
                    </div>

                    <div className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-sm">
                        <div className="flex items-center justify-between">

                            <div className="flex size-11 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                                <ArrowUpRight size={21} />
                            </div>

                            <span className="text-3xl font-bold tabular-nums text-red-500">
                                {categories.filter(category => category.type === "expense").length}
                            </span>

                        </div>

                        <p className="text-sm text-muted-foreground">
                            Categorias de despesa
                        </p>
                    </div>

                </section>

                <section className="space-y-5">

                    <div className="space-y-1">
                        <h2 className="text-lg font-semibold tracking-tight">
                            Minhas categorias
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Gerencie a organização das suas finanças.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">

                        <div className="relative flex-1">

                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                placeholder="Buscar categoria..."
                                aria-label="Buscar categoria"
                                className="h-10 rounded-lg pl-10"
                            />

                        </div>

                        <select
                            aria-label="Filtrar por tipo"
                            className="h-10 cursor-pointer rounded-lg border border-border bg-background px-4 text-sm"
                        >
                            <option value="all">Todos os tipos</option>
                            <option value="income">Receitas</option>
                            <option value="expense">Despesas</option>
                        </select>

                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

                        {categories.map((category) => {

                            const isIncome = category.type === "income"

                            return (
                                <div
                                    key={category.id}
                                    className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-200 hover:border-blue-500/30 hover:shadow-md"
                                >

                                    <div className="flex items-center gap-4 p-5">

                                        <div
                                            className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${
                                                isIncome
                                                    ? "bg-emerald-500/10 text-emerald-500"
                                                    : "bg-red-500/10 text-red-500"
                                            }`}
                                        >
                                            {isIncome
                                                ? <ArrowDownLeft size={23} />
                                                : <ArrowUpRight size={23} />
                                            }
                                        </div>

                                        <div className="min-w-0 flex-1 space-y-1">

                                            <h3 className="truncate font-semibold tracking-tight">
                                                {category.name}
                                            </h3>

                                            <span
                                                className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${
                                                    isIncome
                                                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                                        : "bg-red-500/10 text-red-600 dark:text-red-400"
                                                }`}
                                            >
                                                {isIncome ? "Receita" : "Despesa"}
                                            </span>

                                        </div>

                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between border-t border-border bg-muted/20 px-5 py-3">

                                        <span className="text-xs text-muted-foreground">
                                            Gerenciar categoria
                                        </span>

                                        <div className="flex items-center gap-1">

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                title="Editar categoria"
                                                aria-label={`Editar ${category.name}`}
                                                className="size-8 cursor-pointer text-muted-foreground hover:bg-blue-500/10 hover:text-blue-500"
                                            >
                                                <Pencil size={15} />
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                title="Excluir categoria"
                                                aria-label={`Excluir ${category.name}`}
                                                className="size-8 cursor-pointer text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
                                            >
                                                <Trash2 size={15} />
                                            </Button>

                                        </div>

                                    </div>

                                </div>
                            )
                        })}

                    </div>

                    {categories.length === 0 && (
                        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">

                            <div className="flex size-14 items-center justify-center rounded-xl bg-muted">
                                <LayoutGrid className="text-muted-foreground" />
                            </div>

                            <h3 className="font-semibold">
                                Nenhuma categoria encontrada
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                Crie uma categoria para organizar suas transações.
                            </p>

                        </div>
                    )}

                </section>

            </div>
        </main>
    )
}