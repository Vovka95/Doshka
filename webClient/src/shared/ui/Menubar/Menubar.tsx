import {
    forwardRef,
    type ComponentPropsWithoutRef,
    type ComponentRef,
} from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';

import { cn } from '@/shared/lib/cn';

export const Menubar = forwardRef<
    ComponentRef<typeof MenubarPrimitive.Root>,
    ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
    <MenubarPrimitive.Root
        ref={ref}
        className={cn('flex items-center', className)}
        {...props}
    />
));

export const MenubarMenu = MenubarPrimitive.Menu;

export const MenubarTrigger = forwardRef<
    ComponentRef<typeof MenubarPrimitive.Trigger>,
    ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
    <MenubarPrimitive.Trigger ref={ref} className={cn(className)} {...props} />
));

MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

export const MenubarContent = forwardRef<
    ComponentRef<typeof MenubarPrimitive.Content>,
    ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
    <MenubarPrimitive.Portal>
        <MenubarPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={cn(
                'z-50 overflow-hidden rounded-md border border-border bg-card p-1 shadow-md',
                className,
            )}
            {...props}
        />
    </MenubarPrimitive.Portal>
));

MenubarContent.displayName = MenubarPrimitive.Content.displayName;

export const MenubarSeparator = forwardRef<
    ComponentRef<typeof MenubarPrimitive.Separator>,
    ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <MenubarPrimitive.Separator
        ref={ref}
        className={cn('my-1 h-px bg-border', className)}
        {...props}
    />
));

MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

export const MenubarItem = forwardRef<
    ComponentRef<typeof MenubarPrimitive.Item>,
    ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
        inset?: boolean;
    }
>(({ className, inset, ...props }, ref) => (
    <MenubarPrimitive.Item
        ref={ref}
        className={cn(
            'relative flex cursor-default select-none items-center outline-none',
            'transition-colors',
            'focus:bg-hover data-highlighted:bg-hover',
            'data-disabled:pointer-events-none data-disabled:opacity-50',
            inset && 'pl-8',
            className,
        )}
        {...props}
    />
));

MenubarItem.displayName = MenubarPrimitive.Item.displayName;
