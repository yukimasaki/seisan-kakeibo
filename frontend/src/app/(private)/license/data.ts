"use client";

// todo: ダミーデータを作成する
export const rows = Array.from({ length: 50 }, (_, idx) => {
  const key = idx + 1;
  const title = "Microsoft Office Personal 2019";
  const productKey = "PRODUCT-KEY";
  const purchaseDate = "2024-01-01";
  const expiryDate = "2021-12-31";
  const memo = "hoge";

  return {
    key,
    title,
    productKey,
    purchaseDate,
    expiryDate,
    memo,
  }
});

export const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "title",
    label: "タイトル",
  },
  {
    key: "productKey",
    label: "プロダクトキー",
  },
  {
    key: "purchaseDate",
    label: "購入日",
  },
  {
    key: "expiryDate",
    label: "有効期限",
  },
  {
    key: "memo",
    label: "備考",
  },
];
