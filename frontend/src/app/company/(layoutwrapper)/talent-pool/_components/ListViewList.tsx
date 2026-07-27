"use client";

import { FC, Fragment, useCallback, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import PlaceholderImage from "@/icons/ic-placeholder-profil.svg";
import { ListItem } from "@/components/molecules/ListItem";
import { IconButton } from "@/components/atoms/Button";
import Link from "next/link";
import ArrowRight from "@/icons/ic-arrow-right.svg";
import c from "classnames";
import SearchIcon from "@/icons/ic-search.svg";
import ClearIcon from "@/icons/ic-close.svg";
import { Button } from "@/components/atoms/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Field, Form } from "formik";
import { Paginator } from "@/components/molecules/Paginator";
import useWindowDimensions from "@/utils/useWindowDimensions";
import { useGetTalentPoolListQuery } from "@/hooks/company/talent-pool/useGetTalentPoolListQuery";
import take from "lodash/fp/take";
import sort from "lodash/fp/sortBy";
import CandidateCard from "./CandidateCard";
import useMobileDetect from "@/utils/useMobileDetect";

interface ListViewListProps {
  filters: Record<string, any>;
  categorizedByCompany?: string;
}

// Helper function to get localStorage value safely
const getLocalStorageValue = (key: string, defaultValue: any) => {
  if (typeof window !== "undefined") {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  }
  return defaultValue;
};

// Helper function to set localStorage value
const setLocalStorageValue = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const ListViewList: FC<ListViewListProps> = ({ filters }) => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(
    localStorage?.getItem("talentPoolPage")
      ? Number(localStorage?.getItem("talentPoolPage"))
      : 1,
  );
  console.log(
    page,
    localStorage?.getItem("talentPoolPage"),
    "PAGEEEEEEEEEEEEe",
  );
  // Initialize state from localStorage or defaults
  const [pageSize, setPageSize] = useState(() =>
    getLocalStorageValue("talentPoolPageSize", 10),
  );
  const [sortName, setSortOrder] = useState<string>(() =>
    getLocalStorageValue("talentPoolSortOrder", "firstName"),
  );

  // Initialize using the helper function
  const [searchQuery, setSearchQuery] = useState<string>(() =>
    getLocalStorageValue("talentPoolSearch", ""),
  );
  const { currentDevice, hasMounted } = useMobileDetect();
  const isMobile = currentDevice.isMobile();
  const { width } = useWindowDimensions();

  // Save to localStorage whenever pageSize changes
  useEffect(() => {
    setLocalStorageValue("talentPoolPageSize", pageSize);
  }, [pageSize]);

  // Save to localStorage whenever sortName changes
  useEffect(() => {
    setLocalStorageValue("talentPoolSortOrder", sortName);
  }, [sortName]);

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newPageSize = Number(event.target.value);
    setPageSize(newPageSize);
    setPage(1);
    localStorage.setItem("talentPoolPage", "1"); // Reset to first page when changing page size
  };

  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newSortOrder = event.target.value;
    setSortOrder(newSortOrder);
  };

  const disabled = false;

  const { data, isLoading } = useGetTalentPoolListQuery(
    {
      ...filters,
      search: searchQuery,
      page: localStorage.getItem("talentPoolPage") || page,
    },
    pageSize,
    sortName,
  );

  const totalCount: number = data?.data?.totalCount || 0;
  interface Candidate {
    id: string;
    firstName: string;
    lastName: string;
    imageUrlSmall: string;
    education: {
      id: string;
      university: { name: string } | null;
      educationLevel: { name: string } | null;
      major: { name: string } | null;
      otherUniversity?: string;
      otherMajor?: string;
      startDate: string;
    }[];
    isFavorite: boolean;
    interviewStatus: string;
    visited: boolean;
    categorizedByCompany: string;
  }

  const candidates: Candidate[] = data?.data?.data || [];
  const isTablet = (width ?? 0) >= 600;
  const listClass = isMobile ? c("grid gap-4") : "space-y-3";

  // Save to localStorage whenever search changes
  useEffect(() => {
    setLocalStorageValue("talentPoolSearch", searchQuery);
  }, [searchQuery]);

  const onPageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
      localStorage.setItem("talentPoolPage", newPage.toString());
      const params = new URLSearchParams(searchParams.toString());
      if (newPage) {
        params.set("page", newPage.toString());
      } else {
        params.delete("page");
      }
      router.push(`/company/talent-pool?${params.toString()}`);
    },
    [page, pageSize, sortName, filters],
  );
  console.log(page, localStorage.getItem("talentPoolPage"), "talentPoolPage");
  const anonimize = false;

  return (
    <section className="bg-light-softer flex-grow py-6 sm:py-8 xs:py-16 xs:px-16 px-6 xl:px-8 h-full">
      <div>
        <div className={c("flex justify-between", isMobile ? "flex-col" : "")}>
          <div className="flex justify-between items-center mb-6">
            <h1>{t("companies.talent-pool.title")}</h1>
            {true && isMobile ? (
              <Button tw="px-8 w-auto" type="submit">
                {t("candidate.companies.filter-title")}
              </Button>
            ) : null}
          </div>
          <div>
            <Formik
              initialValues={{ search: searchQuery }}
              enableReinitialize={true} // Add this to sync with external state changes
              onSubmit={({ search }) => {
                setPage(1);
                setSearchQuery(search);
                localStorage.setItem("talentPoolPage", "1");
                const params = new URLSearchParams(searchParams.toString());
                if (search) {
                  params.set("search", search);
                } else {
                  params.delete("search");
                }
                params.set("page", "1");
                router.push(`/company/talent-pool?${params.toString()}`);
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
                      className="ml-10 text-primary-light opacity-50 placeholder-current no-border-search-field"
                      name="search"
                      placeholder={t("candidate.companies.search-placeholder")}
                    />
                    {values.search && (
                      <IconButton
                        onClick={() => {
                          // Reset both Formik and local state
                          resetForm({ values: { search: "" } });
                          setPage(1);
                          localStorage.setItem("talentPoolPage", "1");
                          setSearchQuery("");
                          setLocalStorageValue("talentPoolSearch", "");

                          // Update URL
                          const params = new URLSearchParams(
                            searchParams.toString(),
                          );
                          params.delete("search");
                          params.set("page", "1");
                          router.push(
                            `/company/talent-pool?${params.toString()}`,
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
            {data?.data?.totalCount == null
              ? ""
              : data?.data?.totalCount === 0
              ? "No results found"
              : `${data?.data?.totalCount} candidates`}
          </h3>
          {/* <h3>
            {data?.data?.totalCount} candidates
          </h3> */}
          <div className="flex space-x-2 items-center">
            {true && isTablet ? (
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
            ) : null}
            <span>{t("candidate.companies.table-sort-by")}</span>
            <select
              className="select text-right"
              value={sortName}
              onChange={handleSortOrderChange}
            >
              <option value="firstName">
                {t("candidate.companies.sort-by-option-name-ascending")}
              </option>
              <option value="lastName">
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
          {candidates?.map(
            ({
              id,
              firstName,
              lastName,
              imageUrlSmall,
              education,
              isFavorite,
              interviewStatus,
              visited,
              categorizedByCompany,
            }) => {
              const universityDescription = take(
                isMobile ? 1 : 2,
                sort("startDate", education),
              )
                .reverse()
                .map(
                  ({
                    id,
                    university,
                    educationLevel,
                    major,
                    otherUniversity,
                    otherMajor,
                  }) => {
                    const universityName =
                      university?.name === "Other"
                        ? otherUniversity
                          ? otherUniversity
                          : "Other"
                        : university?.name;
                    const majorName =
                      major?.name === "Other"
                        ? otherMajor
                          ? otherMajor
                          : "Other"
                        : major?.name;
                    const text = `${universityName} - ${educationLevel?.name} in ${majorName}`;
                    const truncatedText =
                      text.length > 25 ? text.substring(0, 25) + " ..." : text;

                    return (
                      <div
                        key={id}
                        className={c(
                          isMobile
                            ? "text-xs font-normal"
                            : "truncate xxl:overflow-normal xxl:break-normal general-text w-4/5",
                        )}
                      >
                        {isMobile ? truncatedText : text}
                      </div>
                    );
                  },
                );
              return isMobile ? (
                <CandidateCard
                  key={id}
                  candidateId={id}
                  photo={imageUrlSmall}
                  title={`${firstName} ${anonimize ? "XXX" : lastName}`}
                  isFavorite={isFavorite}
                  description={universityDescription}
                  interviewStatus={interviewStatus}
                />
              ) : (
                <ListItem
                  loading={isLoading}
                  key={id}
                  id={id}
                  type="candidate"
                  from="talent-pool"
                >
                  <ListItem.Image
                    Placeholder={PlaceholderImage}
                    alt={`${firstName} ${lastName}`}
                    src={anonimize ? "" : imageUrlSmall}
                    interviewStatus={interviewStatus}
                  />
                  <ListItem.Title>
                    {firstName} {anonimize ? "XXX" : lastName}
                  </ListItem.Title>
                  <ListItem.Body>
                    <div className="flex w-full xl:items-center xl:flex-row flex-col">
                      <div className="truncate w-44 md:w-48 xl:w-4/5 lg:max-w-sm xl:max-w-md xl:whitespace-pre-wrap hidden lg:block mr-0">
                        {take(2, sort("startDate", education)).map(
                          ({ university, educationLevel, major }, index) => (
                            <div
                              key={`${university?.name}-${index}`}
                              className="truncate xxl:overflow-normal xxl:break-normal general-text"
                            >
                              {university?.name} - {educationLevel?.name} in{" "}
                              {major?.name}
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </ListItem.Body>
                  <ListItem.Actions disabled={anonimize}>
                    <div className="flex space-x-2">
                      {!anonimize && (
                        <div className="flex flex-col items-end">
                          {categorizedByCompany ? (
                            <div className="text-dark-softer">
                              Ranking: {categorizedByCompany}
                            </div>
                          ) : (
                            <div
                              className={c(
                                "text-dark-softer",
                                visited ? "visible" : "invisible",
                              )}
                            >
                              {t("companies.talent-pool.viewed")}
                            </div>
                          )}
                          <Link href={`/company/talent-pool/${id}`}>
                            <div className="flex items-center text-primary-light px-4 py-2">
                              {t("companies.talent-pool.show-profile")}
                              <ArrowRight className="ml-4 w-4 h-4 fill-current" />
                            </div>
                          </Link>
                        </div>
                      )}
                    </div>
                  </ListItem.Actions>
                </ListItem>
              );
            },
          )}
        </ul>

        {data?.data?.totalCount > 0 && (
          <>
            <div className="flex justify-center mx-auto overflow-hidden">
              <Paginator
                disabled={false}
                {...{
                  page: Number(localStorage.getItem("talentPoolPage")),
                  totalCount,
                  perPageCount: pageSize,
                  onPageChange,
                }}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};
