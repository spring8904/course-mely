'use client'

import type { Table } from '@tanstack/react-table'
import { Download, Plus } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { exportTableToXLSX } from '@/lib/export'
import { Membership } from '@/types/membership'

interface MembershipsTableToolbarActionsProps {
  table: Table<Membership>
}

export function MembershipsTableToolbarActions({
  table,
}: MembershipsTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button size="sm" asChild>
        <Link href={'/instructor/memberships/create'}>
          <Plus />
          Tạo gói
        </Link>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToXLSX(table, {
            filename: 'memberships',
            excludeColumns: ['select', 'actions'],
          })
        }
        className="gap-2"
      >
        <Download className="size-4" aria-hidden="true" />
        Xuất file
      </Button>
    </div>
  )
}
