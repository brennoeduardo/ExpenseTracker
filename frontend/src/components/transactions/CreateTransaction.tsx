import { PlusIcon } from 'lucide-react'
import { Dialog } from 'radix-ui'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export interface CreateTransaction {
    description: string
    amount: number
    type: 'income' | 'expense'
    categoryId: number
    date: string
    note?: string
}

export default function CreateTransaction({ }) {

    return (
        <Dialog.Root>

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

                    <Label htmlFor='description' className='pb-2 pt-2'>
                        Descrição
                    </Label>
                    <Input id="description" name='description' placeholder='Ex: Mercado' required />

                    <Label htmlFor='amount' className='pb-2 pt-2'>
                        Valor
                    </Label>
                    <Input id="amount" name="amount" placeholder='Ex: 9,90' required  type='number'/>

                    <Dialog.Close asChild>
                        <button className="mt-4 rounded-lg bg-gray-200 px-4 py-2">
                            Cancelar
                        </button>
                    </Dialog.Close>

                </Dialog.Content>

            </Dialog.Portal>


        </Dialog.Root>
    )
}

