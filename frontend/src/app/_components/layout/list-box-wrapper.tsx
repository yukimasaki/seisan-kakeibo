export const ListboxWrapperComponent = ({
  children,
}: {
  children: React.ReactNode,
}) => (
  <div className="w-full h-fit border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 lg:w-1/3">
    {children}
  </div>
);
