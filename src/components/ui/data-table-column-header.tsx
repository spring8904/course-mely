import { Column } from '@tanstack/react-table'
import { ArrowUp } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  const isSortedAsc = column.getIsSorted() === 'asc'
  const isSortedDesc = column.getIsSorted() === 'desc'

  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(isSortedAsc)}
      className={cn(
        'px-0 hover:bg-transparent',
        column.getIsSorted() && 'text-accent-foreground',
        className
      )}
    >
      <span>{title}</span>
      <ArrowUp
        className={cn(
          'size-4 transition-transform',
          isSortedAsc ? 'rotate-0' : isSortedDesc ? 'rotate-180' : 'hidden'
        )}
      />
    </Button>
  )
}
