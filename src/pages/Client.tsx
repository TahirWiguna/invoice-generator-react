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
import { Label } from "@radix-ui/react-label";
import { Input } from "../components/ui/input";
import { useToast } from "../components/ui/use-toast";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks/useTypedSelector";
import { selectClient } from "@/store/client/client.slice";
import { Client } from "@/types/client";
import { createClient, deleteClient, getClient, getClientById, updateClient } from "@/store/client/client.api";

const DEFAULT_FORM = {
    company_name: "",
    name: "",
    address: "",
    email: "",
    phone_number: "",
};

const DEFAULT_FORM_EDIT = {
    ...DEFAULT_FORM,
    id: 0,
};

const Client = () => {
    const dispatch = useAppDispatch();
    const { loading, error, clients } = useAppSelector(selectClient);
    const [form, setForm] = useState(DEFAULT_FORM);
    const [formEdit, setFormEdit] = useState(DEFAULT_FORM_EDIT);
    const [currentId, setCurrentId] = useState(0);
    const [editModal, setEditModal] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        async function fetchPaymentMethods() {
            await dispatch(getClient());
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
            const res = await dispatch(createClient(form)).unwrap();
            await dispatch(getClient());
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

    const onDelete = async (id: number) => {
        try {
            const res = await dispatch(deleteClient(id)).unwrap();
            await dispatch(getClient());
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
        const res = await dispatch(getClientById(id)).unwrap();
        setFormEdit({
            id: res.data.id,
            company_name: res.data.company_name,
            name: res.data.name,
            address: res.data.address,
            email: res.data.email,
            phone_number: res.data.phone_number,
        });
        setEditModal(true);
    };

    const onEdit = async () => {
        let post = {
            data: {
                company_name: formEdit.company_name,
                name: formEdit.name,
                address: formEdit.address,
                email: formEdit.email,
                phone_number: formEdit.phone_number,
            },
            id: formEdit.id,
        };

        console.log(post);
        try {
            const res = await dispatch(updateClient(post)).unwrap();
            await dispatch(getClient());
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
                            <Label htmlFor="company_name" className="text-right">
                                Company Name
                            </Label>
                            <Input
                                id="company_name"
                                name="company_name"
                                value={formEdit["company_name"]}
                                onInput={onInputEditChange}
                                className="col-span-3"
                            />
                        </div>
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
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="address" className="text-right">
                                Address
                            </Label>
                            <Input
                                id="address"
                                name="address"
                                value={formEdit["address"]}
                                onInput={onInputEditChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                value={formEdit["email"]}
                                onInput={onInputEditChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone_number" className="text-right">
                                Phone Number
                            </Label>
                            <Input
                                id="phone_number"
                                name="phone_number"
                                value={formEdit["phone_number"]}
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
                    <Button className="mb-6">Add Client</Button>
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
                            <Label htmlFor="company_name" className="text-right">
                                Company Name
                            </Label>
                            <Input
                                id="company_name"
                                name="company_name"
                                value={form["company_name"]}
                                onInput={onInputChange}
                                className="col-span-3"
                            />
                        </div>
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
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="address" className="text-right">
                                Address
                            </Label>
                            <Input
                                id="address"
                                name="address"
                                value={form["address"]}
                                onInput={onInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                value={form["email"]}
                                onInput={onInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone_number" className="text-right">
                                Phone Number
                            </Label>
                            <Input
                                id="phone_number"
                                name="phone_number"
                                value={form["phone_number"]}
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
                            <TableHead>Company Name</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone Number</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6}>Loading...</TableCell>
                            </TableRow>
                        ) : clients ? (
                            clients.data.map((client: Client) => {
                                return (
                                    <TableRow key={client.id}>
                                        <TableCell className="font-medium">
                                            <Button
                                                className="inline-block m-1"
                                                variant="default"
                                                onClick={() => {
                                                    edit(client.id);
                                                }}
                                            >
                                                E
                                            </Button>
                                            <Button
                                                className="inline-block m-1"
                                                variant="destructive"
                                                onClick={() => {
                                                    onDelete(client.id);
                                                }}
                                            >
                                                D
                                            </Button>
                                        </TableCell>
                                        <TableCell>{client.company_name}</TableCell>
                                        <TableCell>{client.name}</TableCell>
                                        <TableCell>{client.address}</TableCell>
                                        <TableCell>{client.email}</TableCell>
                                        <TableCell>{client.phone_number}</TableCell>
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

export default Client;
