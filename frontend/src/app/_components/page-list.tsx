"use client";

import { PageList } from "@type/page-list";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { ListboxWrapperComponent } from "@components/layout/list-box-wrapper";
import { PositionCenterWrapperComponent } from "@components/layout/position-center-wrapper";

export const PageListComponent = ({
  pages,
}: {
  pages: PageList[],
}) => {
  return (
    <>
      <PositionCenterWrapperComponent>
        <ListboxWrapperComponent>
          <Listbox variant="faded" aria-label="Listbox menu with icons">
            {pages.map(page => {
              return (
                <ListboxItem
                  key={page.name}
                  startContent={page.icon}
                  href={page.path}
                >
                  {page.name}
                </ListboxItem>
              );
            })}
          </Listbox>
        </ListboxWrapperComponent>
      </PositionCenterWrapperComponent>
    </>
  );
}
