import { MenuIcon, PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";

import { IconButton } from "@/shared/ui/IconButton";

import { useUIStore } from "@/shared/store/ui";
import { useIsMobile } from "@/shared/lib/hooks/media-query";

export const SidebarToggle = () => {
    const isMobile = useIsMobile();

    const isSidebarCollapsed = useUIStore((s) => s.isSidebarCollapsed);
    const toggleSidebarCollapsed = useUIStore((s) => s.toggleSidebarCollapsed);

    const isSidebarMobileOpen = useUIStore((s) => s.isSidebarMobileOpen);
    const toggleSidebarMobile = useUIStore((s) => s.toggleSidebarMobile);

    const handleOnClick = () => {
        if (isMobile) toggleSidebarMobile();
        else toggleSidebarCollapsed();
    };

    const ariaLabel = isMobile
        ? isSidebarMobileOpen
            ? "Close sidebar"
            : "Open sidebar"
        : isSidebarCollapsed
          ? "Expand sidebar"
          : "Collapse sidebar";

    const icon = isMobile ? (
        <MenuIcon />
    ) : isSidebarCollapsed ? (
        <PanelLeftOpenIcon />
    ) : (
        <PanelLeftCloseIcon />
    );

    return (
        <IconButton
            aria-label={ariaLabel}
            variant="ghost"
            className="text-muted-fg"
            icon={icon}
            onClick={handleOnClick}
        />
    );
};
