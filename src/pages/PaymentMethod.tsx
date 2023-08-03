import { ButtonHTMLAttributes, useEffect, useState } from "react";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "../components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useAppDispatch, useAppSelector } from "@/store/hooks/useTypedSelector";
import {
    createPaymentMethod,
    deletePaymentMethod,
    getPaymentMethodById,
    getPaymentMethodData,
    selectPaymentMethods,
    updatePaymentMethod,
} from "@/store/user/payment_method.slice";
import { PaymentMethod as TypePaymentMethod } from "@/types/payment_method";
import { Label } from "@radix-ui/react-label";
import { Input } from "../components/ui/input";
import { useToast } from "../components/ui/use-toast";

const DEFAULT_FORM = {
    name: "",
};

const DEFAULT_FORM_EDIT = {
    name: "",
    id: 0,
};

const PaymentMethod = () => {
    const dispatch = useAppDispatch();
    const { loading, error, payment_methods } = useAppSelector(selectPaymentMethods);
    const [form, setForm] = useState(DEFAULT_FORM);
    const [formEdit, setFormEdit] = useState(DEFAULT_FORM_EDIT);
    const [editModal, setEditModal] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        async function fetchPaymentMethods() {
            await dispatch(getPaymentMethodData());
        }
        fetchPaymentMethods();
    }, []);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const onInputEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormEdit({ ...formEdit, [e.target.name]: e.target.value });
    };

    const onFormSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const res = await dispatch(createPaymentMethod(form)).unwrap();
            await dispatch(getPaymentMethodData());
            toast({
                title: "Info",
                description: res.message,
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error,
            });
        }
    };

    const edit = async (id: number) => {
        const res = await dispatch(getPaymentMethodById(id)).unwrap();
        setFormEdit({
            id: res.data.id,
            name: res.data.name,
        });
        setEditModal(true);
    };

    const onEdit = async () => {
        let post = {
            data: { name: formEdit.name },
            id: formEdit.id,
        };

        console.log(post);
        try {
            const res = await dispatch(updatePaymentMethod(post)).unwrap();
            await dispatch(getPaymentMethodData());
            toast({
                title: "Info",
                description: res.message,
            });
            setEditModal(false);
        } catch (error: any) {
            toast({
                title: "Error",
                description: error,
            });
        }
    };

    const onDelete = async (id: number) => {
        try {
            const res = await dispatch(deletePaymentMethod(id)).unwrap();
            await dispatch(getPaymentMethodData());
            toast({
                title: "Info",
                description: res.message,
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error,
            });
        }
    };

    return (
        <>
            <Dialog open={editModal} onOpenChange={setEditModal}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                value={formEdit["name"]}
                                onInput={onInputEditChange}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                                e.preventDefault();
                                onEdit();
                            }}
                        >
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="mb-6">Add Payment Method</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                value={form["name"]}
                                onInput={onInputChange}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={onFormSubmit}>
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Action</TableHead>
                            <TableHead>Name</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4}>Loading...</TableCell>
                            </TableRow>
                        ) : payment_methods ? (
                            payment_methods.data.map((payment_method: TypePaymentMethod) => {
                                return (
                                    <TableRow key={payment_method.id}>
                                        <TableCell className="font-medium">
                                            <Button
                                                className="inline-block m-1"
                                                variant="default"
                                                onClick={() => {
                                                    edit(payment_method.id);
                                                }}
                                            >
                                                E
                                            </Button>
                                            <Button
                                                className="inline-block m-1"
                                                variant="destructive"
                                                onClick={() => {
                                                    onDelete(payment_method.id);
                                                }}
                                            >
                                                D
                                            </Button>
                                        </TableCell>
                                        <TableCell>{payment_method.name}</TableCell>
                                    </TableRow>
                                );
                            })
                        ) : null}
                    </TableBody>
                </Table>
            )}
        </>
    );
};

export default PaymentMethod;
