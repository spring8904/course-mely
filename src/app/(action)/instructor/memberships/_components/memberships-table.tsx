'use client'

import { DataTable } from '@/components/data-table/data-table'
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton'
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar'
import {
  useGetMemberships,
  useToggleStatusMembership,
} from '@/hooks/instructor/use-membership'
import { useDataTable } from '@/hooks/use-data-table'
import { DataTableFilterField } from '@/types/data-table'
import { Membership, MembershipStatusMap } from '@/types/membership'
import { useMemo } from 'react'
import { MembershipsTableFloatingBar } from './memberhips-table-floating-bar'
import { getColumns } from './memberships-table-columns'
import { MembershipsTableToolbarActions } from './memberships-table-toolbar-actions'

const filterFields: DataTableFilterField<Membership>[] = [
  {
    id: 'name',
    label: 'Tên gói',
    placeholder: 'Tên gói...',
  },
  {
    id: 'status',
    label: 'Trạng thái',
    options: Object.entries(MembershipStatusMap).map(([key, value]) => ({
      label: value.label,
      value: key,
    })),
  },
]

export const MembershipsTable = () => {
  const { data, isLoading } = useGetMemberships()
  const { mutate } = useToggleStatusMembership()

  const columns = useMemo(() => getColumns(mutate), [mutate])

  const { table } = useDataTable({
    data,
    columns,
    initialState: {
      sorting: [{ id: 'created_at', desc: true }],
      columnPinning: { right: ['actions'] },
    },
    getRowId: (originalRow) => originalRow.id?.toString(),
  })

  return !isLoading ? (
    <>
      <DataTable
        table={table}
        floatingBar={<MembershipsTableFloatingBar table={table} />}
      >
        <DataTableToolbar table={table} filterFields={filterFields}>
          <MembershipsTableToolbarActions table={table} />
        </DataTableToolbar>
      </DataTable>
    </>
  ) : (
    <DataTableSkeleton
      columnCount={7}
      searchableColumnCount={1}
      filterableColumnCount={1}
      cellWidths={[
        '2.5rem',
        '12rem',
        '12rem',
        '12rem',
        '12rem',
        '12rem',
        '2.5rem',
      ]}
      shrinkZero
    />
  )
}
