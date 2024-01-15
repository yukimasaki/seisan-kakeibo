"use server";

import { HeaderComponent } from "@components/header";
import { GroupsIcon } from "@components/icon/groups";
import { PageListComponent } from "@components/page-list";

const HomePage = async () => {
  const iconClasses = "text-xl text-blue-500 pointer-events-none flex-shrink-0";

  const pages = [
    {
      name: "Home",
      path: "/",
      icon: GroupsIcon({ className: iconClasses }),
    },
    {
      name: "Profile",
      path: "/profile",
      icon: GroupsIcon({ className: iconClasses }),
    },
    {
      name: "License",
      path: "/license",
      icon: GroupsIcon({ className: iconClasses }),
    },
    {
      name: "Test 1",
      path: "/test1",
      icon: GroupsIcon({ className: iconClasses }),
    },
    {
      name: "Transaction",
      path: "/transaction",
      icon: GroupsIcon({ className: iconClasses }),
    },
  ];

  return (
    <>
      <HeaderComponent />
      <PageListComponent pages={pages} />
    </>
  );
}

export default HomePage;
