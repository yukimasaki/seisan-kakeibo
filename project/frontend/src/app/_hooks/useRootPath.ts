import { usePathname } from "next/navigation";

export const useRootPath = () => {
  const path = usePathname();
  const rootPath = path === "/" ? path : path.split("/")[0];
  return rootPath;
};
