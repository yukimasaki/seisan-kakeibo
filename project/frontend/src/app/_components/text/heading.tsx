"use client";

import React from "react";

export const H1Component = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={`text-2xl font-extrabold leading-relaxed tracking-widest ${className}`}
    >
      {children}
    </h1>
  );
};
