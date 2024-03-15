import { Icon } from "@frontend/components/icon/icon";

const iconClasses = "text-xl text-blue-500 pointer-events-none flex-shrink-0";

export const pages = [
  {
    name: "Home",
    path: "/",
    icon: Icon({
      name: "Groups",
      className: iconClasses,
    }),
  },
  {
    name: "Profile",
    path: "/profile",
    icon: Icon({
      name: "Groups",
      className: iconClasses,
    }),
  },
  {
    name: "Group",
    path: "/group",
    icon: Icon({
      name: "Groups",
      className: iconClasses,
    }),
  },
  {
    name: "Transaction",
    path: "/transaction",
    icon: Icon({
      name: "Groups",
      className: iconClasses,
    }),
  },
];
