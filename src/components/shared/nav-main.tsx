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
                  tooltip={item.title}
                  asChild
                >
                  <Link
                    href={item.url}
                    className={cn(
                      pathname === item.url && 'bg-primary/5 text-primary'
                    )}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
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
                            <div className="pb-2 pr-2 text-lg font-medium text-sidebar-foreground">
                              {item.title}
                            </div>
                            <SidebarMenuSub className="mx-0 border-l-2 pl-2 pr-0">
                              {item.items.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    className="hover:bg-primary/10 hover:text-primary"
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
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            className="hover:bg-primary/10 hover:text-primary"
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
