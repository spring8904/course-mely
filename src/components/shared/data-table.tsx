'use client'

import { useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { format } from 'date-fns'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination } from '@/components/shared/data-table-pagination'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  enableDateFilter?: boolean
  onDateFilterChange?: (filters: {
    fromDate: Date | null
    toDate: Date | null
  }) => void
  onSearchChange?: (searchTerm: string) => void
  showPageSize?: boolean
  showPageIndex?: boolean
  showNavigateButtons?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  enableDateFilter = false,
  onDateFilterChange,
  onSearchChange,
  showPageSize = true,
  showPageIndex = true,
  showNavigateButtons = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState<any>([])
  const [rowSelection, setRowSelection] = useState({})
  const [fromDate, setFromDate] = useState<Date | null>(null)
  const [toDate, setToDate] = useState<Date | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      globalFilter,
      rowSelection,
    },
  })

  const handleDateFilterChange = (from: Date | null, to: Date | null) => {
    setFromDate(from)
    setToDate(to)
    if (onDateFilterChange) {
      onDateFilterChange({ fromDate: from, toDate: to })
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    if (onSearchChange) {
      onSearchChange(value)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Input
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="max-w-sm"
        />

        {enableDateFilter && (
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {fromDate ? format(fromDate, 'dd/MM/yyyy') : 'Từ ngày'}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="p-0">
                <Calendar
                  mode="single"
                  selected={fromDate || undefined}
                  onSelect={(date: any) => handleDateFilterChange(date, toDate)}
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {toDate ? format(toDate, 'dd/MM/yyyy') : 'Đến ngày'}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="p-0">
                <Calendar
                  mode="single"
                  selected={toDate || undefined}
                  onSelect={(date: any) =>
                    handleDateFilterChange(fromDate, date)
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        'font-semibold',
                        header.column.columnDef.meta?.className
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!isLoading ? (
              table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          className={cell.column.columnDef.meta?.className}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Đang tải dữ liệu...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination
        showPageIndex={showPageIndex}
        showPageSize={showPageSize}
        showNavigateButtons={showNavigateButtons}
        table={table}
      />
    </div>
  )
}
