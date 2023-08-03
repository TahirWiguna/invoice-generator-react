import { Menu } from "@/types/menu";

interface ComponentProps {
    menu: Menu[];
}

const Sidebar = (props: ComponentProps) => {
    const { menu } = props;

    const styles = {
        position: "relative",
        "--radix-scroll-area-corner-width": "0px",
        "--radix-scroll-area-corner-height": "0px",
    } as React.CSSProperties;
    return (
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
            <div
                dir="ltr"
                className="relative overflow-hidden py-6 pr-6 lg:py-8"
                style={styles}
            >
                <div
                    data-radix-scroll-area-viewport=""
                    className="h-full w-full rounded-[inherit]"
                >
                    <div className="min-w-full table">
                        <div className="w-full">
                            {menu.map((item, index) => (
                                <div key={index} className="pb-4">
                                    <h4 className="mb-1 rounded-md px-2 py-1 text-lg font-semibold">
                                        {item.title}
                                    </h4>
                                    <div className="grid grid-flow-row auto-rows-max text-sm">
                                        {item.items.map((subitem, index) => (
                                            <a
                                                key={index}
                                                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-muted-foreground"
                                                target=""
                                                rel=""
                                                href={subitem.url}
                                            >
                                                {subitem.title}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
