import { useState } from "react";
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";

import { IconButton } from "@/shared/ui/IconButton";

export const SideBarToggle = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => setCollapsed((prev) => !prev);

    return (
        <IconButton
            variant="ghost"
            className="text-muted-fg"
            icon={collapsed ? <PanelLeftCloseIcon /> : <PanelLeftOpenIcon />}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={toggle}
        />
    );
};
