import { Dialog } from 'radix-ui'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import type { Category } from '@/types/categories'
import { NumericFormat } from 'react-number-format'
import { toast } from 'sonner'

import {
    PlusIcon,
    ArrowLeftRight,
    ArrowDownLeft,
    ArrowUpRight,
    X,
    Check
} from 'lucide-react'

import { Button } from '../ui/button'

export interface CreateTransaction {
    name: string
    description: string
    amount: number
    type: 'income' | 'expense' | ''
    category_id: number | null
    transaction_date: string
}

type CreateTransactionProps = {
    onCreate: (data: CreateTransaction) => Promise<void>,
    categories: Category[]
}
export default function CreateTransaction({
    onCreate,
    categories
}: CreateTransactionProps) {

    const [open, setOpen] = useState(false)
    const [form, setForm] = useState<CreateTransaction>({
        name: '',
        amount: 0,
        category_id: null,
        transaction_date: '',
        type: '',
        description: ''
    })

    const types = [
        { id: 1, name: 'Receita', type: 'income' },
        { id: 2, name: 'Despesa', type: 'expense' }
    ]

    async function createTransaction() {
        if (!validate()) return

        try {
            await onCreate(form)

            toast.success('Transação criada com sucesso!')
            setOpen(false)
            reset()
        } catch {
            toast.error('Erro ao criar transação.')
        }
    }

    function validate() {

        if (!form.transaction_date) {
            toast.error('Selecione a data da transação', { duration: 2500 })
            return false
        }

        if (!form.name.trim()) {
            toast.error('Insira um nome para a transação', { duration: 2500 })
            return false
        }

        if (!form.amount || form.amount <= 0) {
            toast.error('Insira um valor válido para a transação', { duration: 2500 })
            return false
        }

        if (!form.type) {
            toast.error('Selecione um tipo para a transação', { duration: 2500 })
            return false
        }

        if (!form.category_id) {
            toast.error('Selecione uma categoria para a transação', { duration: 2500 })
            return false
        }

        return true
    }

    function reset() {
        setForm({
            name: '',
            amount: 0,
            category_id: null,
            transaction_date: '',
            type: '',
            description: ''
        })
    }

    return (
        <Dialog.Root
            open={open}
            onOpenChange={(isOpen) => {
                setOpen(isOpen)
                if (!isOpen) reset()
            }}
        >

            <Dialog.Trigger asChild>
                <Button className="cursor-pointer gap-2 rounded-lg bg-blue-600 text-white shadow-sm transition-colors hover:bg-blue-700">
                    <PlusIcon size={18} />
                    Nova transação
                </Button>
            </Dialog.Trigger>

            <Dialog.Portal>

                <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />

                <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-border bg-background text-foreground shadow-2xl">

                    <div className="space-y-4 border-b border-border p-6">

                        <div className="flex items-start justify-between">

                            <div className="flex size-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                <ArrowLeftRight size={23} />
                            </div>

                            <Dialog.Close asChild>
                                <button
                                    type="button"
                                    aria-label="Fechar modal"
                                    className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                >
                                    <X size={18} />
                                </button>
                            </Dialog.Close>

                        </div>

                        <div className="space-y-1">

                            <Dialog.Title className="text-xl font-semibold tracking-tight">
                                Nova transação
                            </Dialog.Title>

                            <Dialog.Description className="text-sm leading-relaxed text-muted-foreground">
                                Registre uma receita ou despesa para manter
                                suas finanças atualizadas.
                            </Dialog.Description>

                        </div>

                    </div>

                    <div className="space-y-5 p-6">

                        <div className="space-y-2">

                            <Label>Tipo de transação</Label>

                            <div
                                role="group"
                                aria-label="Tipo de transação"
                                className="grid grid-cols-2 gap-3"
                            >

                                <button
                                    type="button"
                                    aria-pressed={form.type === 'income'}
                                    onClick={() =>
                                        setForm({
                                            ...form,
                                            type: 'income',
                                            category_id: null
                                        })
                                    }
                                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border p-3 text-sm font-medium transition-all ${form.type === 'income'
                                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                        : 'border-border text-muted-foreground hover:bg-muted'
                                        }`}
                                >
                                    <ArrowDownLeft size={19} />
                                    Receita
                                </button>

                                <button
                                    type="button"
                                    aria-pressed={form.type === 'expense'}
                                    onClick={() =>
                                        setForm({
                                            ...form,
                                            type: 'expense',
                                            category_id: null
                                        })
                                    }
                                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border p-3 text-sm font-medium transition-all ${form.type === 'expense'
                                        ? 'border-red-500 bg-red-500/10 text-red-600 dark:text-red-400'
                                        : 'border-border text-muted-foreground hover:bg-muted'
                                        }`}
                                >
                                    <ArrowUpRight size={19} />
                                    Despesa
                                </button>

                            </div>

                        </div>

                        <div className="space-y-2">

                            <Label htmlFor="name">
                                Nome da transação
                            </Label>

                            <Input
                                id="name"
                                name="name"
                                placeholder="Ex: Salário mensal"
                                required
                                value={form.name}
                                onChange={(event) =>
                                    setForm({
                                        ...form,
                                        name: event.target.value
                                    })
                                }
                                className="h-11 rounded-lg"
                            />

                        </div>

                        <div className="space-y-2">

                            <Label htmlFor="amount">
                                Valor da transação
                            </Label>

                            <NumericFormat
                                id="amount"
                                customInput={Input}
                                thousandSeparator="."
                                decimalSeparator=","
                                decimalScale={2}
                                fixedDecimalScale
                                allowNegative={false}
                                prefix="R$ "
                                placeholder="R$ 0,00"
                                value={form.amount}
                                onValueChange={(values) =>
                                    setForm({
                                        ...form,
                                        amount: Number(values.value || 0)
                                    })
                                }
                                className="h-16 rounded-xl bg-muted/30 px-4 text-xl font-semibold tabular-nums md:text-2xl"
                            />

                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                            <div className="min-w-0 space-y-2">

                                <Label htmlFor="date">
                                    Data
                                </Label>

                                <Input
                                    id="date"
                                    name="date"
                                    required
                                    type="date"
                                    value={form.transaction_date}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            transaction_date: event.target.value
                                        })
                                    }
                                    className="h-11 w-full rounded-lg"
                                />

                            </div>

                            <div className="min-w-0 space-y-2">

                                <Label htmlFor="category">
                                    Categoria
                                </Label>

                                <Select
                                    disabled={!form.type}
                                    value={
                                        form.category_id !== null
                                            ? String(form.category_id)
                                            : ''
                                    }
                                    onValueChange={(value) =>
                                        setForm({
                                            ...form,
                                            category_id: Number(value)
                                        })
                                    }
                                >

                                    <SelectTrigger
                                        id="category"
                                        className="h-11! w-full rounded-lg"
                                    >
                                        <SelectValue
                                            placeholder="Selecione"
                                        />
                                    </SelectTrigger>

                                    <SelectContent className="z-[60]">

                                        <SelectGroup>

                                            {categories
                                                .filter((item) =>
                                                    item.type === form.type
                                                )
                                                .map((item) => (
                                                    <SelectItem
                                                        key={item.id}
                                                        value={String(item.id)}
                                                    >
                                                        {item.name}
                                                    </SelectItem>
                                                ))}

                                        </SelectGroup>

                                    </SelectContent>

                                </Select>

                            </div>

                        </div>

                        <div className="space-y-2">

                            <div className="flex items-center justify-between">

                                <Label htmlFor="description">
                                    Descrição
                                </Label>

                                <span className="text-xs text-muted-foreground">
                                    Opcional
                                </span>

                            </div>

                            <textarea
                                id="description"
                                name="description"
                                placeholder="Adicione detalhes sobre a transação..."
                                value={form.description}
                                maxLength={250}
                                rows={3}
                                onChange={(event) =>
                                    setForm({
                                        ...form,
                                        description: event.target.value
                                    })
                                }
                                className="w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                            />

                        </div>

                    </div>

                    <div className="flex items-center justify-end gap-3 border-t border-border bg-muted/20 p-5">

                        <Dialog.Close asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="cursor-pointer rounded-lg"
                            >
                                Cancelar
                            </Button>
                        </Dialog.Close>

                        <Button
                            type="button"
                            onClick={createTransaction}
                            className="cursor-pointer gap-2 rounded-lg bg-blue-600 px-5 text-white hover:bg-blue-700"
                        >
                            <Check size={16} />
                            Criar transação
                        </Button>

                    </div>

                </Dialog.Content>

            </Dialog.Portal>

        </Dialog.Root>
    )
}

