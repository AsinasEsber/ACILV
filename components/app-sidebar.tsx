"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LifeBuoy,
  Send,
  LayoutDashboard,
  Calendar1,
  Users,
  CalendarClock,
  Clock5,
  Settings,
  Briefcase,
  MessageCircleHeart,
  House
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarMenu,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavSecondary } from "./nav-secondary"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      //icon: SquareTerminal,
      icon : LayoutDashboard,
      //items: false,
    },
    {
      title: "Leave Request",
      url: "/dashboard/leave",
      icon: CalendarClock,
    },
    {
      title: "Time Track",
      url: "/dashboard/time",
      //icon: BookOpen,
      icon: Clock5,
    },
    {
      title: "Calender",
      url: "#",
      //icon: Bot,
      icon: Calendar1,
    },
    {
      title: "Staff",
      url: "#",
      //icon: SquareTerminal,
      icon: Users,
      isActive: false,
      items: [
        {
          title: "Supervisors",
          url: "#",
        },
        {
          title: "HR",
          url: "#",
        },
        {
          title: "General Employees",
          url: "#",
        },
      ],
    },
    
    
    {
      title: "Settings",
      url: "#",
      //icon: Settings2,
      icon: Settings,
      isActive: false,
      items: [
        {
          title: "Account",
          url: "#",
        },
        {
          title: "Security",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Workforce Planning",
      url: "#",
      icon: Briefcase,
    },
    {
      name: "Employee Feedback",
      url: "#",
      icon: MessageCircleHeart,
    },
    {
      name: "Remote Work Strategy",
      url: "#",
      icon: House,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">ACILV</span>
                  <span className="truncate text-xs">Focus on what matters</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser session={null} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
