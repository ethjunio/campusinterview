"use client";

import { useRef, useEffect, MutableRefObject } from "react";
import { useFormikContext } from "formik";
import { flatten } from "flat";
import { useSearchParams } from "next/navigation";

// Helper function to focus on an input or textarea element
function tryToFocus(
  ref: MutableRefObject<HTMLFormElement | null>,
  control: string,
  name: string
) {
  const el = ref.current?.querySelector(
    `${control}[name="${name}"]`
  ) as HTMLDivElement;

  el?.focus();
}

// Helper function to focus on a select element
function tryToFocusSelect(
  ref: MutableRefObject<HTMLFormElement | null>,
  name: string
) {
  const el = ref.current?.querySelector(
    `#${name.replace(".", "-")} input`
  ) as HTMLDivElement;

  el?.focus();
}

// Helper function to focus on a tag list element
function tryToFocusTagList(
  ref: MutableRefObject<HTMLFormElement | null>,
  name: string
) {
  const el = ref.current?.querySelector(
    `label[for="${name}"]`
  ) as HTMLDivElement;

  if (el) {
    const { y, height } = el.getBoundingClientRect();
    window.scrollTo(0, y - height);
  }
}

// Hook to handle focusing based on URL parameters
export function useFocusRoute(
  defaultRef?: MutableRefObject<HTMLFormElement | null>
) {
  const ref = defaultRef || useRef<HTMLFormElement | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const focusParam = searchParams.get("focus");
    if (focusParam) {
      tryToFocus(ref, "input", focusParam);
      tryToFocus(ref, "textarea", focusParam);
      tryToFocusSelect(ref, focusParam);
      tryToFocusTagList(ref, focusParam);
    }
  }, [searchParams]);

  return [ref];
}

// Hook to handle focusing on the first error field after form submission
export function useFocusOnError() {
  const { isSubmitting, isValid, errors } = useFormikContext();
  const ref = useRef<HTMLFormElement | null>(null); // Nullable ref to support initial state
  useFocusRoute(ref);

  useEffect(() => {
    if (!isSubmitting && !isValid && ref.current) {
      const name = Object.keys(flatten(errors))[0];

      tryToFocus(ref, "input", name);
      tryToFocus(ref, "textarea", name);
      tryToFocusSelect(ref, name);
    }
  }, [isSubmitting, isValid, errors]);

  return [ref];
}
