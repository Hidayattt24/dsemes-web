import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/common/EmptyState";

export interface TableColumn<T> {
  readonly key:       string;
  readonly header:    string;
  readonly render:    (row: T) => ReactNode;
  readonly className?: string;
}

interface DataTableProps<T> {
  readonly columns:    TableColumn<T>[];
  readonly data:       T[];
  readonly keyExtract: (row: T) => string;
  readonly loading?:   boolean;
  readonly emptyTitle?: string;
  readonly emptyMessage?: string;
  readonly skeletonRows?: number;
}

export function DataTable<T>({
  columns,
  data,
  keyExtract,
  loading       = false,
  emptyTitle    = "Tidak ada data",
  emptyMessage  = "Belum ada data yang tersedia.",
  skeletonRows  = 4,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left">
        <thead className="bg-[#F4F6F8]/50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={[
                  "px-8 py-5 text-[11px] font-bold text-[#718096]",
                  "uppercase tracking-widest whitespace-nowrap",
                  col.className ?? "",
                ].join(" ")}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E2E8F0]/50">
          {loading ? (
            Array.from({ length: skeletonRows }).map((_, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.key} className="px-8 py-5">
                    <Skeleton height={20} />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-8 py-16">
                <EmptyState title={emptyTitle} message={emptyMessage} />
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={keyExtract(row)}
                className="hover:bg-[#F4F6F8]/30 transition-all group"
              >
                {columns.map((col) => (
                  <td key={col.key} className={`px-8 py-5 ${col.className ?? ""}`}>
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
