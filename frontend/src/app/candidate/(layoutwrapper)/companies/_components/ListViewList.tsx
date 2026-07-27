"use client";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import PlaceholderImage from "@/icons/ic-placeholder-profil.svg";
import { ListItem } from "@/components/molecules/ListItem";
import { IconButton } from "@/components/atoms/Button";
import Link from "next/link";
import ArrowRight from "@/icons/ic-arrow-right.svg";
import FavoriteIcon from "@/icons/ic-favorite.svg";
import FavoriteFullIcon from "@/icons/ic-favorite_full.svg";
import c from "classnames";
import SearchIcon from "@/icons/ic-search.svg";
import ClearIcon from "@/icons/ic-close.svg";
import { Button } from "@/components/atoms/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetCompanyListQuery } from "@/hooks/student/companymgmt/useGetCompanyListQuery";
import { Formik, Field, Form } from "formik";
import { Paginator } from "@/components/molecules/Paginator";
import { useCreateAddRemoveCompanyFavoutiteMutation } from "@/hooks/student/companymgmt/useCreateAddRemoveCompanyFavoutiteMutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import useMobileDetect from "@/utils/useMobileDetect";
import CompanyCard from "./CompanyCard";
import useWindowDimensions from "@/utils/useWindowDimensions";

interface ListViewListProps {
  filters: Record<string, any>;
  onFilterClick?: () => void;
}

export const ListViewList: FC<ListViewListProps> = ({
  filters,
  onFilterClick,
}) => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { width } = useWindowDimensions();

  // Load defaults from localStorage or fallback
  const [page, setPage] = useState(
    localStorage?.getItem("companyPage")
      ? Number(localStorage?.getItem("companyPage"))
      : 1,
  );
  const [pageSize, setPageSize] = useState<number>(() => {
    return Number(localStorage.getItem("companyPageSize")) || 10;
  });
  const [sortOrder, setSortOrder] = useState<string>(() => {
    return localStorage.getItem("companySortOrder") || "ASC";
  });

  const [searchValue, setSearchValue] = useState<string>(() => {
    return localStorage.getItem("companySearch") || "";
  });

  const disabled = false;
  const { currentDevice, hasMounted } = useMobileDetect();
  const isMobile = currentDevice.isMobile();
  const isTablet = (width ?? 0) >= 600;
  const listClass = isMobile ? c("grid gap-4") : "space-y-3";

  const { data, isLoading } = useGetCompanyListQuery(
    { ...filters, search: searchValue, page },
    pageSize,
    sortOrder,
  ) as any;

  const totalCount: number = data?.result?.totalCount || 0;
  const companies = data?.result?.data;

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newSize = Number(event.target.value);
    setPageSize(newSize);
    localStorage.setItem("companyPageSize", newSize.toString());
  };

  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newOrder = event.target.value;
    setSortOrder(newOrder);
    localStorage.setItem("companySortOrder", newOrder);
  };

  const onPageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
      localStorage.setItem("companyPage", newPage.toString());
      const params = new URLSearchParams(searchParams.toString());
      if (newPage) {
        params.set("page", newPage.toString());
      } else {
        params.delete("page");
      }
      router.push(`/candidate/companies?${params.toString()}`);
    },
    [searchParams, router],
  );

  useEffect(() => {
    // Save search value to localStorage whenever it changes
    localStorage.setItem("companySearch", searchValue);
  }, [searchValue]);

  const CreateAddRemoveCompanyFavMutation =
    useCreateAddRemoveCompanyFavoutiteMutation({
      onSuccess: (msg: any) => {
        queryClient.invalidateQueries({ queryKey: ["getCompanyList"] });
        toast.success(msg?.message);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      },
    });

  return (
    <section className="bg-light-softer flex-grow py-6 sm:py-8 xs:py-16 xs:px-16 px-6 xl:px-8 h-full">
      <div>
        <div className={c("flex justify-between", isMobile ? "flex-col" : "")}>
          <div className="flex justify-between items-center mb-6">
            <h1>{t("candidate.companies.list-title")}</h1>
            {hasMounted && isMobile ? (
              <Button
                tw="px-8 w-auto"
                type="submit"
                onClick={() => {
                  onFilterClick && onFilterClick();
                }}
              >
                {t("candidate.companies.filter-title")}
              </Button>
            ) : null}
          </div>

          <div>
            <Formik
              initialValues={{ search: searchValue }}
              enableReinitialize
              onSubmit={({ search }) => {
                setPage(1);
                localStorage.setItem("companyPage", "1");
                setSearchValue(search);
                const params = new URLSearchParams(searchParams.toString());
                if (search) {
                  params.set("search", search);
                } else {
                  params.delete("search");
                }
                params.set("page", "1");
                router.push(`/candidate/companies?${params.toString()}`);
              }}
            >
              {({ values, handleSubmit, resetForm }) => (
                <Form onSubmit={handleSubmit}>
                  <div
                    className={c(
                      "relative flex items-center p-2 rounded-full",
                      {
                        "b-dark-softer cursor-not-allowed": disabled,
                        "bg-white": !disabled,
                      },
                    )}
                  >
                    <SearchIcon className="ml-5 absolute stroke-current stroke-3 left-0 text-primary-light w-4 h-4 fill-current" />
                    <Field
                      disabled={disabled}
                      style={{ width: "calc(100% - 65px)" }}
                      className="ml-10 text-primary-light opacity-50 placeholder-current border-none focus:border-none focus:outline-none focus:ring-0"
                      name="search"
                      placeholder={t("candidate.companies.search-placeholder")}
                    />
                    {values.search && (
                      <IconButton
                        onClick={() => {
                          resetForm();
                          setPage(1);
                          localStorage.setItem("companyPage", "1");
                          setSearchValue("");
                          localStorage.removeItem("companySearch");
                          const params = new URLSearchParams(
                            searchParams.toString(),
                          );
                          params.delete("search");
                          params.set("page", "1");
                          router.push(
                            `/candidate/companies?${params.toString()}`,
                          );
                        }}
                        tw="absolute right-0 mr-2 p-2"
                        variant="link"
                        icon={
                          <ClearIcon className="text-primary-light w-3 h-3 fill-current" />
                        }
                      />
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <div className="mt-6 xs:mt-16 space-y-5">
        <div className="flex justify-between">
          <h3>
            {data?.result?.totalCount == null
              ? ""
              : data.result.totalCount === 0
              ? "No results found"
              : `${data.result.totalCount} ${t(
                  "candidate.companies.companies",
                )}`}
          </h3>
          <div className="flex space-x-2 items-center">
            {hasMounted && isTablet && (
              <Fragment>
                <span>{t("candidate.companies.table-items-per-page")}</span>
                <select
                  className="select text-right"
                  value={pageSize}
                  onChange={handlePageSizeChange}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </Fragment>
            )}
            <span>{t("candidate.companies.table-sort-by")}</span>
            <select
              className="select text-right"
              value={sortOrder}
              onChange={handleSortOrderChange}
            >
              <option value="ASC">
                {t("candidate.companies.sort-by-option-name-ascending")}
              </option>
              <option value="DESC">
                {t("candidate.companies.sort-by-option-name-descending")}
              </option>
            </select>
          </div>
        </div>

        <ul
          className={listClass}
          style={
            isMobile
              ? { gridTemplateColumns: "repeat(auto-fill, minmax(9rem, 1fr))" }
              : undefined
          }
        >
          {companies?.map((item: any) =>
            isMobile ? (
              <CompanyCard
                key={item?.id}
                companyId={item?.id}
                photo={item?.imageUrlSmall}
                title={item?.name}
                isFavorite={item?.isFavorite}
                description={item?.industriesDescription}
              />
            ) : (
              <ListItem
                loading={isLoading}
                key={item?.id}
                type="company"
                id={item?.id}
              >
                <ListItem.Image
                  Placeholder={PlaceholderImage}
                  alt={item?.name}
                  src={item?.imageUrlSmall}
                />
                <ListItem.Title>{item?.name}</ListItem.Title>
                <ListItem.Body>
                  <div className="truncate w-44 xl:w-full xl:whitespace-pre-wrap hidden sm:block mr-0 xl:mr-16">
                    {item?.description}
                  </div>
                </ListItem.Body>
                <ListItem.Actions>
                  <div className="flex space-x-2">
                    <IconButton
                      onClick={(event) => {
                        event.stopPropagation();
                        CreateAddRemoveCompanyFavMutation.mutate({
                          companyId: item?.id,
                        });
                      }}
                      tw="p-2 mr-1"
                      variant="link"
                      icon={
                        item?.isFavourite ? (
                          <FavoriteFullIcon className="w-4 h-4 fill-current" />
                        ) : (
                          <FavoriteIcon className="w-4 h-4 fill-current" />
                        )
                      }
                    />
                    <Link href={`/candidate/companies/${item?.id}`}>
                      <div className="px-4 py-4 flex items-center text-primary-light">
                        {t("candidate.companies.show-profile")}
                        <ArrowRight className="ml-4 w-4 h-4 fill-current" />
                      </div>
                    </Link>
                  </div>
                </ListItem.Actions>
              </ListItem>
            ),
          )}
        </ul>

        {totalCount > 0 && (
          <div className="flex justify-center mx-auto overflow-hidden">
            <Paginator
              disabled={false}
              {...{ page, totalCount, perPageCount: pageSize, onPageChange }}
            />
          </div>
        )}
      </div>
    </section>
  );
};
