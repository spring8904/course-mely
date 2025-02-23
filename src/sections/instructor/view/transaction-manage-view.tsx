'use client'

import React, { useState } from 'react'
import { ArrowUpDown, ChevronLeft, ChevronRight, Search } from 'lucide-react'

const mockTransactions = [
  { id: 1, transaction_code: 'TRX001', amount: 1500, status: 'completed' },
  { id: 2, transaction_code: 'TRX002', amount: 2300, status: 'pending' },
  { id: 3, transaction_code: 'TRX003', amount: 800, status: 'failed' },
  { id: 4, transaction_code: 'TRX004', amount: 3200, status: 'completed' },
  { id: 5, transaction_code: 'TRX005', amount: 1700, status: 'pending' },
  { id: 6, transaction_code: 'TRX006', amount: 950, status: 'completed' },
  { id: 7, transaction_code: 'TRX007', amount: 4200, status: 'failed' },
  { id: 8, transaction_code: 'TRX008', amount: 1100, status: 'pending' },
]

function TransactionManageView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<
    'transaction_code' | 'amount' | 'status'
  >('transaction_code')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const itemsPerPage = 5

  // Filter and sort transactions
  const filteredAndSortedTransactions = mockTransactions
    .filter(
      (transaction) =>
        transaction.transaction_code
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.amount.toString().includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1
      }
      return a[sortField] < b[sortField] ? 1 : -1
    })

  // Calculate pagination
  const totalPages = Math.ceil(
    filteredAndSortedTransactions.length / itemsPerPage
  )
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTransactions = filteredAndSortedTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const handleSort = (field: typeof sortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getStatusStyle = (status: string) => {
    const baseStyle =
      'px-3 py-1 rounded-full text-xs font-medium flex items-center justify-center w-24'
    switch (status) {
      case 'completed':
        return `${baseStyle} bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20`
      case 'pending':
        return `${baseStyle} bg-amber-50 text-amber-700 ring-1 ring-amber-600/20`
      case 'failed':
        return `${baseStyle} bg-rose-50 text-rose-700 ring-1 ring-rose-600/20`
      default:
        return `${baseStyle} bg-gray-50 text-gray-700 ring-1 ring-gray-600/20`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="px-6 py-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Transactions
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Manage and monitor your transaction history
                </p>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="size-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-lg border border-gray-200 py-2 pl-10 pr-3 text-sm placeholder:text-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-8 flow-root">
              <div className="-mx-6 -my-2 overflow-x-auto lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th
                          scope="col"
                          className="group cursor-pointer px-6 py-3 text-left"
                          onClick={() => handleSort('transaction_code')}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900">
                              Transaction Code
                            </span>
                            <ArrowUpDown className="size-4 text-gray-400 group-hover:text-gray-600" />
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="group cursor-pointer px-6 py-3 text-left"
                          onClick={() => handleSort('amount')}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900">
                              Amount
                            </span>
                            <ArrowUpDown className="size-4 text-gray-400 group-hover:text-gray-600" />
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="group cursor-pointer px-6 py-3 text-left"
                          onClick={() => handleSort('status')}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900">
                              Status
                            </span>
                            <ArrowUpDown className="size-4 text-gray-400 group-hover:text-gray-600" />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {paginatedTransactions.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="transition-colors hover:bg-gray-50/50"
                        >
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">
                                {transaction.transaction_code}
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-900">
                              ${transaction.amount.toLocaleString()}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span
                              className={getStatusStyle(transaction.status)}
                            >
                              {transaction.status.charAt(0).toUpperCase() +
                                transaction.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(
                    startIndex + itemsPerPage,
                    filteredAndSortedTransactions.length
                  )}
                </span>{' '}
                of{' '}
                <span className="font-medium">
                  {filteredAndSortedTransactions.length}
                </span>{' '}
                results
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.max(page - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:hover:bg-white"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`inline-flex size-8 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        currentPage === i + 1
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.min(page + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:hover:bg-white"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionManageView
