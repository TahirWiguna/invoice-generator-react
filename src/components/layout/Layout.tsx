import { Toaster } from "@/components/ui/toaster";

import Header from "./Header";
import Main from "./Main";
import Sidebar from "./Sidebar";

const menu = [
    {
        title: "General",
        items: [
            {
                title: "Dashboard",
                url: "/admin/dashboard",
            },
            {
                title: "Generate",
                url: "/admin/generate",
            },
        ],
    },
    {
        title: "Master",
        items: [
            {
                title: "Item",
                url: "/admin/master/item",
            },
            {
                title: "Client",
                url: "/admin/master/client",
            },
            {
                title: "Payment Method",
                url: "/admin/master/payment_method",
            },
        ],
    },
    {
        title: "Auth",
        items: [
            {
                title: "User",
                url: "/admin/auth/user",
            },
            {
                title: "Roles",
                url: "/admin/auth/roles",
            },
            {
                title: "Permission",
                url: "/admin/auth/permission",
            },
        ],
    },
];

const Layout = ({ mainComponent }: { mainComponent: React.ReactNode }) => {
    return (
        <>
            <div className="relative flex min-h-screen flex-col">
                <Header menu={menu} />
                <div className="flex-1">
                    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
                        <Sidebar menu={menu} />
                        <Main mainComponent={mainComponent} />
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
};

export default Layout;
