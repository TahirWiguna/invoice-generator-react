import parse from "html-react-parser";
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
import { selectItem } from "@/store/item/item.slice";
import { Item } from "@/types/item";
import { createItem, deleteItem, getItem, getItemById, updateItem } from "@/store/item/item.api";
import { ValidationErrors } from "@/types/response";

const DEFAULT_FORM = {
    name: "",
    price: "",
    description: "",
};

const DEFAULT_FORM_EDIT = {
    ...DEFAULT_FORM,
    id: 0,
};

const Item = () => {
    const dispatch = useAppDispatch();
    const { loading, error, items } = useAppSelector(selectItem);
    const [form, setForm] = useState(DEFAULT_FORM);
    const [formEdit, setFormEdit] = useState(DEFAULT_FORM_EDIT);
    const [editModal, setEditModal] = useState(false);
    const [modal, setModal] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        async function fetchPaymentMethods() {
            await dispatch(getItem());
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
            const res = await dispatch(createItem(form)).unwrap();
            await dispatch(getItem());
            toast({
                title: "Info",
                description: res.message,
            });
            setModal(false);
        } catch (error: any) {
            const newError: string | ValidationErrors = error;
            if (typeof newError === "string") {
                toast({
                    title: "Error",
                    description: error,
                });
            } else {
                toast({
                    title: "Error",
                    description: (
                        <ul>
                            {newError.data.map((item: any, i) => {
                                return <li key={i}>{item.message}</li>;
                            })}
                        </ul>
                    ),
                });
            }
        }
    };

    const onDelete = async (id: number) => {
        try {
            const res = await dispatch(deleteItem(id)).unwrap();
            await dispatch(getItem());
            toast({
                title: "Info",
                description: res.message,
            });
            console.log("aaaaaaa", error);
        } catch (error: any) {
            toast({
                title: "Error",
                description: error,
            });
        }
    };

    const edit = async (id: number) => {
        const res = await dispatch(getItemById(id)).unwrap();
        const data = res.data;

        setFormEdit({
            id: data.id,
            name: data.name,
            price: data.price,
            description: data.description,
        });
        setEditModal(true);
    };

    const onEdit = async () => {
        let post = {
            data: {
                name: formEdit.name,
                price: formEdit.price,
                description: formEdit.description,
            },
            id: formEdit.id,
        };

        try {
            const res = await dispatch(updateItem(post)).unwrap();
            await dispatch(getItem());
            toast({
                title: "Info",
                description: res.message,
            });
            setEditModal(false);
        } catch (error: any) {
            console.log(error);
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
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                description
                            </Label>
                            <Input
                                id="description"
                                name="description"
                                value={formEdit["description"]}
                                onInput={onInputEditChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Price
                            </Label>
                            <Input
                                id="price"
                                name="price"
                                value={formEdit["price"]}
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

            <Dialog open={modal} onOpenChange={setModal}>
                <DialogTrigger asChild>
                    <Button className="mb-6">Add Item</Button>
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
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                description
                            </Label>
                            <Input
                                id="description"
                                name="description"
                                value={form["description"]}
                                onInput={onInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Price
                            </Label>
                            <Input
                                id="price"
                                name="price"
                                value={form["price"]}
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
                            <TableHead>Description</TableHead>
                            <TableHead>Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6}>Loading...</TableCell>
                            </TableRow>
                        ) : items ? (
                            items.data.map((item: Item) => {
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">
                                            <Button
                                                className="inline-block m-1"
                                                variant="default"
                                                onClick={() => {
                                                    edit(item.id);
                                                }}
                                            >
                                                E
                                            </Button>
                                            <Button
                                                className="inline-block m-1"
                                                variant="destructive"
                                                onClick={() => {
                                                    onDelete(item.id);
                                                }}
                                            >
                                                D
                                            </Button>
                                        </TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>{item.price}</TableCell>
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

export default Item;
