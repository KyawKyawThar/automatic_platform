"use client";

import { url } from "inspector";
import {
  CreditCardIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from "./ui/sidebar";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";
import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useHasAciveSubscription } from "@/app/feature/subscription/hook/use-subscription";

const menuItems = [
  {
    title: "Main",
    items: [
      {
        title: "Workflows",
        icon: FolderOpenIcon,
        url: "/workflows",
      },

      {
        title: "Credentials",
        icon: KeyIcon,
        url: "/credentials",
      },

      {
        title: "Executions",
        icon: HistoryIcon,
        url: "/executions",
      },
    ],
  },
];

export const AppsideBar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { hasActiveSubscription, isLoading } = useHasAciveSubscription();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
            <Link href="/workflows" prefetch>
              <Image src="/logo.svg" alt="Nodebase" width={30} height={30} />
              <span className="font-semibold text-sm">HighestLeve</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>

      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={
                        item.url === "/"
                          ? pathName === "/"
                          : pathName.startsWith(item.url)
                      }
                      asChild
                      className="gap-x-4 h-10 px-4">
                      <Link href={item.url} prefetch>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {!hasActiveSubscription && !isLoading && (
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="upgrate to pro"
                className="gap-x-4 h-10 px-4"
                onClick={() => authClient.checkout({ slug: "HighestLeveL" })}>
                <StarIcon className="h-4 w-4" />
                <span>Upgrate to Pro</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Billing Portal"
              className="gap-x-4 h-10 px-4"
              onClick={() => authClient.customer.portal()}>
              <CreditCardIcon className="h-4 w-4" />
              <span>Billing Protal</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign Out"
              className="gap-x-4 h-10 px-4"
              onClick={() => {
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/login");
                    },
                  },
                });
              }}>
              <LogOutIcon className="h-4 w-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
