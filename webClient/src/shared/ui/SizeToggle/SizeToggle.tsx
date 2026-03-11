import { Button } from '@/shared/ui';

import { useUIStore } from '@/shared/store/ui';

import { cn } from '@/shared/lib/cn';

type SizeType = 'xs' | 'sm' | 'md' | 'lg';

const options: { value: SizeType; label: string }[] = [
    { value: 'xs', label: 'XS' },
    { value: 'sm', label: 'SM' },
    { value: 'md', label: 'MD' },
    { value: 'lg', label: 'LG' },
];

export const SizeToggle = () => {
    const size = useUIStore((s) => s.size);
    const setSize = useUIStore((s) => s.setSize);

    return (
        <div
            role="radiogroup"
            aria-label="Size"
            className="inline-flex rounded-sm border border-border p-1 gap-1"
        >
            {options.map((o) => {
                const active = size === o.value;
                return (
                    <Button
                        key={o.value}
                        type="button"
                        role="radio"
                        variant="ghost"
                        aria-checked={active}
                        className={cn([
                            active
                                ? 'bg-selected text-fg font-medium'
                                : 'text-muted-fg',
                        ])}
                        onClick={() => setSize(o.value)}
                    >
                        {o.label}
                    </Button>
                );
            })}
        </div>
    );
};
