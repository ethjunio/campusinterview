"use client";
import { FC, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import c from "classnames";
import { ListViewFilter } from "./ListViewFilter";
import { ListViewList } from "./ListViewList";
import useMobileDetect from "@/utils/useMobileDetect";

export const ListViewFeature: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filterParams, setFilterParams] = useState<Record<string, any>>({});
  const [filterStatus, setFilterStatus] = useState(false);
  const { currentDevice } = useMobileDetect();
  const isMobile = currentDevice.isMobile();

  const handleApplyFilters = (filters: Record<string, any>) => {
    setFilterParams(filters);
    localStorage?.setItem("talentPoolPage", "1");

    // Build query string
    const queryString = new URLSearchParams(
      Object.entries(filters).reduce((acc, [key, value]) => {
        if (value && value.length) acc[key] = JSON.stringify(value);
        return acc;
      }, {} as Record<string, string>),
    ).toString();

    router.push(`${pathname}?${queryString}`);
  };

  function toggleFilter() {
    setFilterStatus((prevState) => {
      return !prevState;
    });
  }

  return (
    <>
      <div
        className={c(
          isMobile ? (filterStatus ? "block w-full" : "hidden") : "block",
        )}
      >
        <ListViewFilter
          onApplyFilters={handleApplyFilters}
          onClose={toggleFilter}
        />
      </div>
      <div className={c(isMobile && filterStatus ? "hidden" : "block w-full")}>
        <ListViewList filters={filterParams} onFilterClick={toggleFilter} />
      </div>
    </>
  );
};
