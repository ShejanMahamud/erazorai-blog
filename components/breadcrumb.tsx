import { cn } from '@/lib/utils';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export interface BreadcrumbItem {
    name: string;
    href: string;
    current?: boolean;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
    return (
        <nav
            className={cn('flex items-center space-x-1 text-sm text-muted-foreground', className)}
            aria-label="Breadcrumb"
        >
            <ol className="flex items-center space-x-1">
                <li>
                    <Link
                        href="/"
                        className="flex items-center hover:text-foreground transition-colors"
                        aria-label="Home"
                    >
                        <Home className="h-4 w-4" />
                    </Link>
                </li>

                {items.map((item, index) => (
                    <li key={item.href} className="flex items-center space-x-1">
                        <ChevronRight className="h-4 w-4 flex-shrink-0" aria-hidden="true" />

                        {item.current ? (
                            <span
                                className="font-medium text-foreground truncate"
                                aria-current="page"
                            >
                                {item.name}
                            </span>
                        ) : (
                            <Link
                                href={item.href}
                                className="hover:text-foreground transition-colors truncate"
                            >
                                {item.name}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
