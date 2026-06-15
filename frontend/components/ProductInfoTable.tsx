"use client";

interface ProductInfoRow {
  label: string;
  value?: string;
}

interface ProductInfoTableProps {
  data: {
    shipper?: string;
    returns?: string;
    payment?: string;
  };
}
export default function ProductInfoTable({ data }: ProductInfoTableProps) {
  const rows: ProductInfoRow[] = [
    { label: "Shipper / Seller", value: data.shipper },
    { label: "Returns", value: data.returns },
    { label: "Payment", value: data.payment },
  ];

  return (
    <section className="w-full">
      <table className="text-[11px] leading-[16px] text-muted align-middle table-auto border-separate">
        <tbody className="[&>tr:first-child>td]:pt-0">
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="pr-[12px] w-[50px]">{row.label}</td>
              <td className="w-[50px] break-words">
                {row.value ?? "-----------"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
