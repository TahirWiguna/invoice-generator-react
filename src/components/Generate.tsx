import { useEffect } from "react"
import { getClient } from "@/store/client/client.api"
import { selectClient } from "@/store/client/client.slice"
import { generate } from "@/store/generate/generate.api"
import { selectGenerate } from "@/store/generate/generate.slice"
import { useAppDispatch, useAppSelector } from "@/store/hooks/useTypedSelector"
import { getItem } from "@/store/item/item.api"
import { selectItem } from "@/store/item/item.slice"
import {
    getPaymentMethodData,
    selectPaymentMethods,
} from "@/store/user/payment_method.slice"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import moment from "moment"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { ValidationErrors } from "@/types/response"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useToast } from "./ui/use-toast"

const formSchema = z.object({
    client_id: z.string(),
    payment_method_id: z.string(),
    due_date: z.date(),
    items: z.array(
        z.object({
            id: z.string().nonempty(),
            qty: z.string().nonempty(),
        })
    ),
})

type FormValues = z.infer<typeof formSchema>
const defaultValues: Partial<FormValues> = {
    items: [{ id: "", qty: "1" }],
}

const Generate = () => {
    const dispatch = useAppDispatch()
    const { clients } = useAppSelector(selectClient)
    const { items } = useAppSelector(selectItem)
    const { payment_methods } = useAppSelector(selectPaymentMethods)
    const { loading } = useAppSelector(selectGenerate)
    const { toast } = useToast()

    useEffect(() => {
        async function fetchClients() {
            await dispatch(getClient())
        }
        fetchClients()

        async function fetchItems() {
            await dispatch(getItem())
        }
        fetchItems()

        async function fetchPaymentMethods() {
            await dispatch(getPaymentMethodData())
        }
        fetchPaymentMethods()
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    const { fields, append, remove } = useFieldArray({
        name: "items",
        control: form.control,
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        toast({
            title: "Info",
            description: "Generating...",
        })

        let post = {
            ...values,
            due_date: moment(values.due_date).format("YYYY-MM-DD 00:00:00"),
        }
        console.log(post)

        try {
            const res = await dispatch(generate(post)).unwrap()
            toast({
                title: "Info",
                description: res.message,
            })
            form.reset(defaultValues)
        } catch (error: any) {
            const newError: string | ValidationErrors = error
            if (typeof newError === "string") {
                toast({
                    title: "Error",
                    description: error,
                })
            } else {
                toast({
                    title: "Error",
                    description: (
                        <ul>
                            {newError.data.map((item: any, i) => {
                                return <li key={i}>{item.message}</li>
                            })}
                        </ul>
                    ),
                })
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="due_date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Due Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl className="w-full">
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                " pl-3 text-left font-normal",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "P")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date < new Date()}
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="client_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Client</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select the client" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* <ScrollArea className="h-72"> */}
                                        {clients?.data.map((client) => {
                                            return (
                                                <SelectItem
                                                    key={client.id}
                                                    value={String(client.id)}
                                                >
                                                    {client.company_name}
                                                </SelectItem>
                                            )
                                        })}
                                        {/* </ScrollArea> */}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="payment_method_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Payment Method</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select the Payment Mehthod" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* <ScrollArea className="h-72"> */}
                                        <SelectGroup>
                                            {payment_methods?.data.map(
                                                (payment_method) => {
                                                    return (
                                                        <SelectItem
                                                            key={
                                                                payment_method.id
                                                            }
                                                            value={String(
                                                                payment_method.id
                                                            )}
                                                        >
                                                            {
                                                                payment_method.name
                                                            }
                                                        </SelectItem>
                                                    )
                                                }
                                            )}
                                        </SelectGroup>
                                        {/* </ScrollArea> */}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="">
                    {fields.map((field, index) => (
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-9">
                                <FormField
                                    control={form.control}
                                    key={field.id}
                                    name={`items.${index}.id`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                className={cn(
                                                    index !== 0 && "sr-only"
                                                )}
                                            >
                                                Item
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger>
                                                        {!field.value
                                                            ? "Select the item"
                                                            : ""}
                                                        <SelectValue
                                                            placeholder="Select the item"
                                                            aria-placeholder="asd"
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {/* <ScrollArea className="h-72"> */}
                                                        <SelectGroup>
                                                            {items?.data.map(
                                                                (item) => {
                                                                    return (
                                                                        <SelectItem
                                                                            key={
                                                                                item.id
                                                                            }
                                                                            value={String(
                                                                                item.id
                                                                            )}
                                                                        >
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </SelectItem>
                                                                    )
                                                                }
                                                            )}
                                                        </SelectGroup>
                                                        {/* </ScrollArea> */}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="col-span-2">
                                <FormField
                                    control={form.control}
                                    key={field.id}
                                    name={`items.${index}.qty`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                className={cn(
                                                    index !== 0 && "sr-only"
                                                )}
                                            >
                                                Qty
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Ex: 3"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="col-span-1">
                                <FormField
                                    control={form.control}
                                    key={field.id}
                                    name={`items.${index}.qty`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                className={cn(
                                                    index !== 0 && "sr-only"
                                                )}
                                            >
                                                Remove
                                            </FormLabel>
                                            <FormControl>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    className="mt-2 w-full"
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                >
                                                    -
                                                </Button>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => append({ id: "", qty: "1" })}
                    >
                        More Items
                    </Button>
                </div>
                <Button type="submit" disabled={loading}>
                    Generate
                </Button>
            </form>
        </Form>
    )
}

export default Generate
