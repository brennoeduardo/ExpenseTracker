import { PlusIcon } from 'lucide-react'
import { Dialog } from 'radix-ui'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import type { Category } from '@/types/categories'
import { NumericFormat } from 'react-number-format'
import { toast } from 'sonner'

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
        <Dialog.Root open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen)
            if (!isOpen) reset()
        }}>

            <Dialog.Trigger asChild>
                <button className='cursor-pointer'>
                    <PlusIcon />
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50" />

                <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl">
                    <Dialog.Title> Nova transação </Dialog.Title>

                    <Dialog.Description className="mt-2 text-sm text-gray-500">
                        Preencha os dados para registrar uma transação.
                    </Dialog.Description>

                    <Label htmlFor='name' className='pb-2 pt-2'>
                        Nome
                    </Label>
                    <Input id="name" name='name' placeholder='Ex: Salário mensal' required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />

                    <Label htmlFor='description' className='pb-2 pt-2'>
                        Descrição
                    </Label>
                    <Input id="description" name='description' placeholder='Adicione uma descrição (opcional)' value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />

                    <Label htmlFor='amount' className='pb-2 pt-2'>
                        Valor
                    </Label>

                    <NumericFormat
                        customInput={Input}
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={2}
                        prefix="R$ "
                        placeholder="R$0,00"
                        value={form.amount}
                        onValueChange={(values) => {
                            setForm({
                                ...form,
                                amount: Number(values.value || 0)
                            })
                        }}
                    />

                    <Label htmlFor='date' className='pb-2 pt-2'>
                        Data
                    </Label>
                    <Input id="date" name="date" placeholder='01/01/2026' required type='date' value={form.transaction_date} onChange={(event) => setForm({ ...form, transaction_date: event.target.value })} />

                    <Label htmlFor='date' className='pb-2 pt-2'>
                        Tipo
                    </Label>
                    <Select value={form.type} onValueChange={(value: 'expense' | 'income') => setForm({ ...form, type: value, category_id: null })}>
                        <SelectTrigger className="w-full max-w ">
                            <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {types.map((item) => (
                                    <SelectItem key={item.type} value={item.type}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Select disabled={!form.type} value={form.category_id !== null ? String(form.category_id) : ''} onValueChange={(value: 'expense' | 'income') => setForm({ ...form, category_id: Number(value) })}>
                        <SelectTrigger className="w-full max-w mt-2">
                            <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {categories.filter((item) => item.type === form.type).map((item) => (
                                    <SelectItem key={item.id} value={String(item.id)}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <div className="mt-4 flex justify-end gap-2">

                        <Dialog.Close asChild>
                            <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                                Cancelar
                            </button>
                        </Dialog.Close>

                        <button
                            onClick={() => { createTransaction() }}
                            className="rounded-lg bg-green-500 px-5 py-2 text-sm font-medium text-white hover:bg-green-600 transition-colors"
                        >
                            Criar
                        </button>

                    </div>

                </Dialog.Content>

            </Dialog.Portal>


        </Dialog.Root>
    )
}

