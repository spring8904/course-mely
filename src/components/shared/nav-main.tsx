'use client'

import Link from 'next/link'
import { ChevronRight, type LucideIcon } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname()
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              {!item.items?.length ? (
                <SidebarMenuButton
                  variant="primary"
                  tooltip={{
                    children: item.title,
                    className:
                      'bg-sidebar text-sidebar-foreground border shadow-md text-sm py-0 h-7 flex items-center ',
                  }}
                  asChild
                >
                  <Link
                    href={item.url}
                    className={cn(
                      pathname === item.url && 'bg-primary/5 text-primary'
                    )}
                  >
                    {item.icon && <item.icon />}
                    <span className="text-base font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              ) : (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      variant="primary"
                      className={cn(
                        item.items.some(({ url }) => pathname === url) &&
                          'bg-primary/5 text-primary'
                      )}
                      tooltip={{
                        children: (
                          <>
                            <div className="pb-1 pr-2 text-base font-medium text-sidebar-accent-foreground">
                              {item.title}
                            </div>
                            <SidebarMenuSub className="mx-0 my-0.5 border-l-2 border-l-primary/35 p-0 pl-2">
                              {item.items.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    className="hover:bg-sidebar hover:text-primary"
                                    asChild
                                  >
                                    <Link
                                      href={subItem.url}
                                      className={cn(
                                        pathname === subItem.url &&
                                          '!text-primary'
                                      )}
                                    >
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </>
                        ),
                        className: 'bg-sidebar border shadow-md',
                        align: 'start',
                      }}
                    >
                      {item.icon && <item.icon />}
                      <span className="whitespace-nowrap text-base font-medium">
                        {item.title}
                      </span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="my-0.5 border-l-2 border-l-primary/35 py-0">
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            className="hover:bg-sidebar hover:text-primary"
                            asChild
                          >
                            <Link
                              href={subItem.url}
                              className={cn(
                                pathname === subItem.url && '!text-primary'
                              )}
                            >
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
