"use client";

import { fetcher } from "@common/fetcher";
import { Icon } from "@components/icon/icon";
import { Card, CardHeader, CardBody, CardFooter, Button, Table, TableHeader, TableColumn, TableBody, Spinner, TableRow, TableCell } from "@nextui-org/react";
import { Transaction } from "@type/transaction";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { usePathname, useRouter } from "next/navigation";
import useSWR from "swr";

export const TransactionDetailComponent = () => {
  const router = useRouter();

  const path = usePathname();
  const id = path.replace("/transaction/", "");

  const {
    data: transaction,
    error,
    isLoading,
  }: {
    data: Transaction,
    error: any,
    isLoading: boolean,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/${id}`, fetcher, {
    keepPreviousData: true,
  });

  const loadingState = isLoading || transaction.payments.length === 0 ? "loading" : "idle";

  return (
    <div className="flex flex-col h-svh">
      <div className="flex-1 p-2 space-y-2">
        {transaction &&
          <Card>
            <CardHeader className="flex">
              <Button variant="light" onClick={() => router.back()}>
                <Icon name={"Back"} size={14} />
                <p>戻る</p>
              </Button>
            </CardHeader>
            <form>
              <CardBody className="space-y-6 px-6">
                {/* 1 */}
                <div className="flex flex-row justify-between">
                  {/* 1-1 */}
                  <div className="flex flex-col">
                    {/* 1-1-1 */}
                    <div className="flex gap-2">
                      <Icon name="Groups" className="text-green-500" />
                      <span className="text-md self-center">{transaction.category.category}</span>
                    </div>
                    {/* 1-1-2 */}
                    <div className="flex gap-2">
                      <span className="text-md self-center">{dayjs(transaction.paymentDate).locale("ja").format("M/DD (dd)")}</span>
                    </div>
                  </div>

                  {/* 1-2 */}
                  <div className="flex flex-col">
                    {/* 1-2-1 */}
                    <div className="flex gap-2 space-x-0.5">
                      <span className="text-md self-center">{transaction.amount}</span>
                      <span className="text-md self-center">円</span>
                    </div>
                  </div>
                </div>

                {/* 2 */}
                <div className="flex flex-col space-y-3">
                  {/* 2-1 */}
                  <span className="text-md">{transaction.title}</span>
                  {/* 2-2 */}
                  <span className="text-md">{transaction.memo}</span>
                  {/* 2-3 */}
                  <Table
                    aria-label="Example table with dynamic content"
                    color={"default"}
                    removeWrapper
                    isHeaderSticky
                  >
                    <TableHeader>
                      <TableColumn>氏名</TableColumn>
                      <TableColumn>割り勘</TableColumn>
                      <TableColumn>立替え</TableColumn>
                    </TableHeader>
                    <TableBody
                      items={transaction.payments ?? []}
                      loadingState={loadingState}
                      loadingContent={<Spinner />}
                    >
                      {(item) => (
                        <TableRow key={item.id}>
                          <TableCell >{item.payer.userName}</TableCell>
                          <TableCell >{item.defaultPaymentAmount}円</TableCell>
                          <TableCell >{item.actualPaymentAmount}円</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </form>
          </Card>
        }
      </div>
    </div>
  );
};
