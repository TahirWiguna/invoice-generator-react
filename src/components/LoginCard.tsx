import { useState } from "react";
import { redirect } from "react-router-dom";
import { loginUser, selectUser, logoutUser } from "@/store/user/user.slice";

import { LoginCredentials } from "@/types/user";
import { useAppDispatch, useAppSelector } from "@/store/hooks/useTypedSelector";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DEFAULT_FIELDS = {
    username: "",
    password: "",
};

export function LoginCard() {
    const dispatch = useAppDispatch();
    const { loading, error, user } = useAppSelector(selectUser);
    const [formFields, setFormFields] = useState<LoginCredentials>(DEFAULT_FIELDS);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const login = async () => {
        try {
            await dispatch(loginUser(formFields)).unwrap();
            window.location.href = "/admin/dashboard";
        } catch (error) {
            console.log("Login failed", error);
        }
    };

    const logout = async () => {
        await dispatch(logoutUser());
    };

    return (
        <>
            {user ? (
                <Alert variant="default" className="mb-4 w-full max-w-[350px]">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Info</AlertTitle>
                    <AlertDescription>
                        You Already Logged In{" "}
                        <a href="#" onClick={logout}>
                            Logout
                        </a>
                    </AlertDescription>
                </Alert>
            ) : (
                <form className="w-full">
                    <Card className="max-w-[350px] mx-auto">
                        <CardHeader>
                            <CardTitle className="text-center">LOGIN</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {error && (
                                <Alert variant="destructive" className="mb-4">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>{error}</AlertTitle>
                                </Alert>
                            )}
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Username/Email</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        placeholder="Enter username or email"
                                        onInput={onChangeHandler}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter password"
                                        onInput={onChangeHandler}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            {loading ? (
                                <Button className="w-full" disabled>
                                    Signing In...
                                </Button>
                            ) : (
                                <Button className="w-full" onClick={login}>
                                    Sign In
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </form>
            )}
        </>
    );
}

export default LoginCard;
