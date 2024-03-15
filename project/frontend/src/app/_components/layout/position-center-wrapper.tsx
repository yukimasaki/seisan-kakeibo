export const PositionCenterWrapperComponent = ({
  children,
}: {
  children: React.ReactNode,
}) => (
  <div className="flex justify-center p-4 h-[calc(100vh-64px)]">
    {children}
  </div>
);
