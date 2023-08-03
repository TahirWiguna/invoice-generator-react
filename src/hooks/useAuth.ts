import { useAppSelector } from "@/store/hooks/useTypedSelector";
import { selectUser } from "@/store/user/user.slice";
import { useState, useEffect } from "react";

interface Auth {
    isAuthenticated: boolean;
    token: string | null;
}

const useAuth = (): Auth => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Implement your authentication logic here
        const persist = localStorage.getItem("persist:root");
        const json = persist ? JSON.parse(persist) : null;
        const jsonUser = json ? JSON.parse(json.user) : null;
        const userData = jsonUser ? jsonUser.user : null;
        const storedToken = userData ? userData.token : null;
        if (storedToken) {
            // Perform token validation or check against your authentication server
            setIsAuthenticated(true);
            setToken(storedToken);
        } else {
            setIsAuthenticated(false);
            setToken(null);
        }
    }, []);

    return { isAuthenticated, token };
};

export default useAuth;
