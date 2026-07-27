"use client";

import { FC, Fragment, useCallback, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import _ from "lodash";
import PlaceholderImage from "@/icons/ic-placeholder-profil.svg";
import { ListItem } from "@/components/molecules/ListItem";
import { IconButton } from "@/components/atoms/Button";
import Link from "next/link";
import ArrowRight from "@/icons/ic-arrow-right.svg";
import c from "classnames";
import SearchIcon from "@/icons/ic-search.svg";
import ClearIcon from "@/icons/ic-close.svg";
import { Button } from "@/components/atoms/Button";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Formik, Field, Form } from "formik";
import { Paginator } from "@/components/molecules/Paginator";
import useWindowDimensions from "@/utils/useWindowDimensions";
import { useGetTalentPoolListQuery } from "@/hooks/company/talent-pool/useGetTalentPoolListQuery";
import take from "lodash/fp/take";
import sort from "lodash/fp/sortBy";
// import CandidateCard from "./CandidateCard";
import useMobileDetect from "@/utils/useMobileDetect";
import { useGetBookingParticipantsList } from "@/hooks/admin/bookings/useGetparticipantsList";
import { BackLink } from "@/components/atoms/BackLink";

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

interface participants {
  id: string;
  fullName: string;
  position: string;
  email: string;
  companyId: string;
  mainContact: {
    firstName: string;
    lastName: string;
    position: string;
    email: string;
    phoneNumber: string;
  };
  deputyContact: {
    firstName: string;
    lastName: string;
    position: string;
    email: string;
    phoneNumber: string;
  };
  companyDetail: {
    name: string;
    email: string;
    type: string;
  };
}
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

const ListViewList: FC<ListViewListProps> = ({ filters }) => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const { candidateId } = params;
  const [page, setPage] = useState(1);
  // Initialize state from localStorage or defaults
  const [pageSize, setPageSize] = useState(() =>
    getLocalStorageValue("bookingdetailsPageSize", 10)
  );
  const [sortName, setSortOrder] = useState<string>(() =>
    getLocalStorageValue("bookingdetailsSortOrder", "fullName")
  );

  // Initialize using the helper function
  const [searchQuery, setSearchQuery] = useState<string>(() =>
    getLocalStorageValue("bookingdetailsSearch", "")
  );
  const { currentDevice, hasMounted } = useMobileDetect();
  const isMobile = currentDevice.isMobile();
  const { width } = useWindowDimensions();

  // Save to localStorage whenever pageSize changes
  useEffect(() => {
    setLocalStorageValue("bookingdetailsPageSize", pageSize);
  }, [pageSize]);

  // Save to localStorage whenever sortName changes
  useEffect(() => {
    setLocalStorageValue("bookingdetailsSortOrder", sortName);
  }, [sortName]);

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPageSize = Number(event.target.value);
    setPageSize(newPageSize);
    setPage(1); // Reset to first page when changing page size
  };

  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSortOrder = event.target.value;
    setSortOrder(newSortOrder);
  };

  const disabled = false;

  const { data, isLoading } = useGetBookingParticipantsList(
    sortName,
    candidateId as string,
    pageSize,
    page,
    searchQuery
  );
  console.log(data, "data");
  const totalCount: number = data?.totalCount || 0;

  const candidates: participants[] = data?.data || [];
  const isTablet = (width ?? 0) >= 600;
  const listClass = isMobile ? c("grid gap-4") : "space-y-3";

  // Save to localStorage whenever search changes
  useEffect(() => {
    setLocalStorageValue("bookingdetailsSearch", searchQuery);
  }, [searchQuery]);

  const onPageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
      const params = new URLSearchParams(searchParams.toString());
      if (newPage) {
        params.set("page", newPage.toString());
      } else {
        params.delete("page");
      }
      router.push(
        `/admin/dashboard/bookings/${candidateId}?${params.toString()}`
      );
    },
    [page, pageSize, sortName, filters]
  );

  const anonimize = false;
  console.log(candidates, "CANDIDATED");
  return (
    <section className="bg-light-softer flex-grow py-6 sm:py-8 xs:py-16 xs:px-16 px-6 xl:px-8 h-full">
      <div>
        <BackLink className="mb-12" href="/admin/dashboard/bookings">
          {t("admin.back-to-bookings")}
        </BackLink>
        <div className={c("flex justify-between", isMobile ? "flex-col" : "")}>
          <div className="flex justify-between items-center mb-6">
            <h1>{t("admin.bookings-detail")}</h1>
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
                const params = new URLSearchParams(searchParams.toString());
                if (search) {
                  params.set("search", search);
                } else {
                  params.delete("search");
                }
                params.set("page", "1");
                router.push(
                  `/admin/dashboard/bookings/${candidateId}?${params.toString()}`
                );
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
                      }
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
                          setSearchQuery("");
                          setLocalStorageValue("talentPoolSearch", "");

                          // Update URL
                          const params = new URLSearchParams(
                            searchParams.toString()
                          );
                          params.delete("search");
                          params.set("page", "1");
                          router.push(
                            `/admin/dashboard/bookings/${candidateId}?${params.toString()}`
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
        {isMobile ? (
          <ul className="px-4 space-y-4">
            {candidates?.length > 0 ? (
              candidates?.map(
                ({
                  companyId,
                  fullName,
                  email,
                  position,
                  mainContact,
                  deputyContact,
                  companyDetail,
                }) => (
                  <li
                    key={companyId}
                    className="bg-white rounded-lg shadow p-4 flex flex-col space-y-2"
                  >
                    {/* User Name */}
                    <div>
                      <span className="block text-xs font-semibold text-gray-500">
                        User Name
                      </span>
                      <span className="block text-base text-gray-900">
                        <div>{fullName}</div>
                        <div>{companyDetail?.name}</div>
                        <div>
                          {mainContact?.firstName + mainContact?.lastName}
                        </div>
                        <div>
                          {deputyContact?.firstName + deputyContact?.lastName}
                        </div>
                      </span>
                    </div>

                    {/* Email */}
                    <div>
                      <span className="block text-xs font-semibold text-gray-500">
                        Email
                      </span>
                      <span className="block text-base text-gray-900">
                        <div>{email}</div>
                        <div>{companyDetail?.email}</div>
                        <div>{mainContact?.email}</div>
                        <div>{deputyContact?.email}</div>
                      </span>
                    </div>

                    {/* Position */}
                    <div>
                      <span className="block text-xs font-semibold text-gray-500">
                        Position
                      </span>
                      <span className="block text-base text-gray-900">
                        <div>{position}</div>
                        <div>{_.startCase(companyDetail?.type)}</div>
                        <div>{mainContact && "Main Contact"}</div>
                        <div>{deputyContact && "Deputy Contact"}</div>
                      </span>
                    </div>
                  </li>
                )
              )
            ) : (
              <p className="mt-4 flex items-center justify-center mx-auto bg-gray-200 py-4 px-2">
                No participants found for this company
              </p>
            )}
          </ul>
        ) : (
          <ul
            className={listClass}
            // style={
            //   isMobile
            //     ? { gridTemplateColumns: "repeat(auto-fill, minmax(9rem, 1fr))" }
            //     : undefined
            // }
          >
            <div
              className="flex w-full items-center mb-2 font-semibold text-gray-700"
              key="header"
            >
              <div className="truncate w-44 md:w-48 lg:w-1/3">User Name</div>
              <div className="truncate w-44 md:w-48 lg:w-1/3">Email</div>
              <div className="truncate w-44 md:w-48 lg:w-1/3">Position</div>
            </div>
            {candidates?.length > 0 ? (
              candidates?.map(
                ({
                  id,
                  fullName,
                  position,
                  email,
                  companyId,
                  mainContact,
                  deputyContact,
                  companyDetail,
                }) => {
                  return (
                    <ListItem
                      containerStyle={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                      loading={isLoading}
                      key={companyId}
                      id={companyId}
                      type="participant"
                      from="Bookings"
                    >
                      {/* <ListItem.Title>
                  {fullName}
                  </ListItem.Title> */}
                      <ListItem.Body>
                        <div className="flex w-full items-center">
                          <div className="truncate w-44 md:w-48 lg:w-1/3">
                            <div>{fullName?.length > 0 ? fullName : "N/A"}</div>
                            <div>{companyDetail?.name}</div>
                            <div>
                              {mainContact?.firstName?.length > 0 &&
                                mainContact?.firstName + mainContact?.lastName}
                            </div>
                            <div>
                              {deputyContact?.firstName?.length > 0 &&
                                deputyContact?.firstName +
                                  deputyContact?.lastName}
                            </div>
                          </div>
                          <div className="truncate w-44 md:w-48 lg:w-1/3">
                            <div>{email?.length > 0 ? email : "N/A"}</div>
                            <div>{companyDetail?.email}</div>
                            <div>
                              {mainContact?.email?.length > 0 &&
                                mainContact.email}
                            </div>
                            <div>
                              {deputyContact?.email?.length > 0 &&
                                deputyContact.email}
                            </div>
                          </div>
                          <div className="truncate w-44 md:w-48 lg:w-1/3">
                            <div>{position?.length > 0 ? position : "N/A"}</div>
                            <div>{_.startCase(companyDetail?.type)}</div>
                            <div>{mainContact && "Main Contact"}</div>
                            <div>{deputyContact && "Deputy Contact"}</div>
                          </div>
                        </div>
                      </ListItem.Body>
                    </ListItem>
                  );
                }
              )
            ) : (
              <p className="mt-4 flex items-center justify-center mx-auto bg-gray-200 py-4 px-2">
                No participants found for this company
              </p>
            )}
          </ul>
        )}

        {data?.data?.totalCount > 0 && (
          <>
            <div className="flex justify-center mx-auto overflow-hidden">
              <Paginator
                disabled={false}
                {...{ page, totalCount, perPageCount: pageSize, onPageChange }}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ListViewList;
