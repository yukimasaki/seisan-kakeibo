"use client";

import { rows } from "../license/data";

const Test1Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white py-4 fixed w-full z-10">
        Header Content
      </header>

      <main className="flex-1 overflow-y-auto p-4 my-16">
        {rows.map((row) => {
          return (
            <div key={row.key}>
              {row.title}
            </div>
          );
        })}
      </main>

      <footer className="bg-gray-800 text-white py-4 fixed w-full bottom-0">
        Footer Content
      </footer>
    </div>
  );
}

export default Test1Page;
