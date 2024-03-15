"use client";

import { H1Component } from "@frontend/components/text/heading";
import { ParagraphComponent } from "@frontend/components/text/paragraph";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";

export const HomePage = () => {
  return (
    <main className="p-2 bg-emerald-400">
      {/* セクション1 */}
      <section className="pb-8 sm:flex sm:flex-row-reverse">
        {/* 画像 */}
        <div className="p-4 sm:w-1/2 ">
          <Image
            alt={"Hero image"}
            width={450}
            height={300}
            src={"https://via.placeholder.com/450x300"}
          />
        </div>
        {/* キャッチコピー */}
        <div className="p-4 sm:w-1/2 sm:flex sm:flex-col">
          <div className="px-4 pb-2 flex flex-col sm:text-3xl sm:w-[360px] sm:self-end">
            <H1Component className="text-white">
              立替えが楽になる
              <br />
              家計簿アプリ！
            </H1Component>
          </div>
          <div className="px-4 pb-2 sm:w-[360px] sm:self-end">
            <ParagraphComponent className="text-gray-700 font-bold">
              メンバー間の立替えをサポート。柔軟な立替え機能やグループ機能であなたの生活を支えます。
            </ParagraphComponent>
          </div>
        </div>
      </section>

      {/* セクション2 */}
      <section className="pb-8 flex flex-col justify-center items-center">
        <H1Component className="pb-4 text-white">Seisanの機能</H1Component>
        <ParagraphComponent className="pb-4 text-gray-700 font-bold">
          日々の記録や面倒な精算もSeisanなら一瞬。
          <br />
          便利な機能がたくさんあります。
        </ParagraphComponent>
        <div className="px-4 flex flex-col justify-center w-full gap-8 sm:flex-row">
          <Card
            className="shadow-none py-4 w-full sm:max-w-[320px]"
            shadow="sm"
          >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large">柔軟な立替え</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2 items-center">
              <Image
                alt={"Seisan's Feature 1"}
                className="object-cover rounded-xl"
                src={"https://via.placeholder.com/270x270"}
                width={270}
              />
            </CardBody>
          </Card>

          <Card
            className="shadow-none py-4 w-full sm:max-w-[320px]"
            shadow="sm"
          >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large">複数グループの作成</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2 items-center">
              <Image
                alt={"Seisan's Feature 2"}
                className="object-cover rounded-xl"
                src={"https://via.placeholder.com/270x270"}
                width={270}
              />
            </CardBody>
          </Card>

          <Card
            className="shadow-none py-4 w-full sm:max-w-[320px]"
            shadow="sm"
          >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large">PC・スマホ対応</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2 items-center">
              <Image
                alt={"Seisan's Feature 3"}
                className="object-cover rounded-xl"
                src={"https://via.placeholder.com/270x270"}
                width={270}
              />
            </CardBody>
          </Card>
        </div>
      </section>
    </main>
  );
};
