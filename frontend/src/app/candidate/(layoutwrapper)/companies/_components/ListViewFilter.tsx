"use client";

import { FC, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Formik, Form } from "formik";
import { Group } from "@/components/molecules/form/Group";
import { Button } from "@/components/atoms/Button";
import CloseIcon from "@/icons/ic-close.svg";
import { FavoritesFilter } from "./FavouritesFilter";
import { getActiveFiltersListView } from "./initialvalues";
import { IndustryFilter } from "./IndustryFilter";
import { MajorFilter } from "./MajorFilter";
import { PositionFilter } from "./PositionFilter";
import useMobileDetect from "@/utils/useMobileDetect";

const FILTER_STORAGE_KEY = "candidate_list_filters";

const filters: {
  id: "industryIds" | "majorIds" | "offeredPosIds" | "favoriteOnly";
  label: string;
  Component: FC<{ name: string }>;
}[] = [
    { id: "industryIds", label: "candidate.companies.filter-industries", Component: IndustryFilter },
    { id: "majorIds", label: "candidate.companies.filter-majors", Component: MajorFilter },
    { id: "offeredPosIds", label: "candidate.companies.filter-positions", Component: PositionFilter },
  ];

const defaultValues = {
  industryIds: [],
  majorIds: [],
  offeredPosIds: [],
  isFavourite: 0,
};

export const ListViewFilter: FC<{ onApplyFilters: (filterData: Record<string, any>) => void, onClose: () => void }> = ({
  onApplyFilters, onClose
}) => {
  const t = useTranslations();
  const { currentDevice } = useMobileDetect();
  const isMobile = currentDevice.isMobile();

  const [initialValues, setInitialValues] = useState(defaultValues);

  useEffect(() => {
    const storedFilters = localStorage.getItem(FILTER_STORAGE_KEY);
    if (storedFilters) {
      try {
        const parsed = JSON.parse(storedFilters);
        setInitialValues(parsed);
        onApplyFilters(parsed);
      } catch (e) {
        console.error("Error parsing stored filters:", e);
      }
    }
  }, []);

  return (
    <section className="relative py-6 px-6 xl:px-6 flex-shrink-0 w-full lg:w-72 2lg:w-84">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(values));
          onApplyFilters(values);
          resetForm({ values }); // ✅ mark current values as clean
          setSubmitting(false);
        }}
      >
        {({ dirty, values, resetForm, isSubmitting }) => (
          <Form className="w-full">
            <div className="flex justify-between">
              <h2>{t("candidate.companies.filter-title")}</h2>
              {isMobile && <CloseIcon className="w-4 h-4 text-primary-light cursor-pointer"
               onClick={() => {
                onClose && onClose();
              }} />}
            </div>

            <ul className="mt-10 space-y-4">
              <li className="pb-6">
                <FavoritesFilter name="isFavourite" label={t("candidate.companies.filter-favorite-only-label")} />
              </li>
              {filters.map(({ id, label, Component }) => (
                <Group key={id} title={t(label)} count={getActiveFiltersListView(id, values)}>
                  <Component name={id} />
                </Group>
              ))}
              <li className="flex justify-between items-center pt-4 pb-4 -ml-4">
                <Button
                  onClick={() => {
                    resetForm({ values: defaultValues });
                    localStorage.removeItem(FILTER_STORAGE_KEY);
                    onApplyFilters({});
                    onClose();
                  }}
                  variant="link"
                >
                  {t("candidate.companies.filter-clear")}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !dirty}
                  tw="ml-4"
                  variant="primary-light"
                  onClick={() => {
                    onClose();
                  }}     
                >
                  {t("candidate.companies.filter-apply")}
                </Button>
              </li>
            </ul>
          </Form>
        )}
      </Formik>
    </section>
  );
};
