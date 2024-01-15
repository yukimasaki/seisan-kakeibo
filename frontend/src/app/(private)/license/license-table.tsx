"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner, Pagination, Input } from "@nextui-org/react";
import { AddButtonComponent } from "@components/button/add";
import useSWR from "swr";
import { fetcher } from "@common/fetcher";
import { useMemo, useState } from "react";
import { PaginationResult } from "@type/paginate";
import { FilterButtonComponent } from "@components/button/filter";

export const LicenseTableComponent = () => {
  type Book = {
    id: number;
    title: string;
    author: string;
  }

  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "title",
      label: "タイトル",
    },
    {
      key: "author",
      label: "著者",
    },
  ];

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const {
    data,
    error,
    isLoading,
  }: {
    data: PaginationResult<Book[]>,
    error: any,
    isLoading: boolean,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/books/public?page=${page}&perPage=${rowsPerPage}`, fetcher, {
    keepPreviousData: true,
  });

  const loadingState = isLoading || data.items.length === 0 ? "loading" : "idle";

  const pages = useMemo(() => {
    return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
  }, [data?.count, rowsPerPage]);

  return (
    <>
      <div className="flex flex-col h-svh">
        <div className="flex-1 p-4 space-y-4">
          <div className="flex justify-between gap-2">
            <Input
              placeholder={"検索"}
              type={"text"}
              size={"sm"}
              classNames={{
                inputWrapper: "h-10"
              }}
              isClearable
            />
            <FilterButtonComponent />
            <AddButtonComponent />
          </div>
          <Table
            aria-label="Example table with dynamic content"
            color={"default"}
            selectionMode="single"
            isHeaderSticky
            classNames={{
              wrapper: "overflow-y-auto",
            }}
          >
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody
              items={data?.items ?? []}
              loadingState={loadingState}
              loadingContent={<Spinner />}
            >
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => <TableCell >{getKeyValue(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <footer className="flex z-10 p-4 shadow w-full h-auto items-center justify-center fixed bottom-0 inset-x-0 backdrop-blur-lg backdrop-saturate-150 bg-background/70">
          {pages > 0 && (
            <Pagination
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
              showControls
              isCompact
              showShadow
            />
          )}
        </footer>
      </div>
    </>
  );
}
