"use client";

import React from "react";

export const ParagraphComponent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <p className={`leading-loose ${className}`}>{children}</p>;
};
