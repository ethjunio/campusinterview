import { parseISO, formatISO, format, parse } from "date-fns";
import moment from "moment-timezone";

export const defaultFormat = "dd.MM.yyyy";

// Helper function to validate date
function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

export function parseDate(str: any, format = defaultFormat): Date | undefined {
  try {
    let parsed = parse(str, format, new Date());
    if (!isValidDate(parsed)) {
      parsed = parseISO(str);
    }

    if (str.length >= 10 && isValidDate(parsed)) {
      return parsed;
    }
  } catch (error) {
    console.warn("Error parsing date:", error);
  }

  return undefined;
}

export function formatDate(date: Date, dateFormat = defaultFormat) {
  const formatted = format(date, dateFormat);
  return formatted;
}

export function formatDateWithTimeZone(date: any) {
  const formattedDate = moment
    .tz(date, moment.ISO_8601, "Europe/Bratislava")
    .format("DD.MM.YYYY");
  return formattedDate;
}

export function fromDateToISO(date?: string) {
  if (date) {
    const parsed = parseDate(date);
    return parsed && formatISO(parsed);
  }
  return null;
}
export function fromISOtoDateNameStatic(isoDate?: string) {
  if (!isoDate) return null;

  try {
    if (!isoDate) return "";
    
    const d = new Date(isoDate);
    if (isNaN(d.getTime())) return "";
  
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch (error) {
    console.log("Invalid ISO date format:", isoDate);
    return null;
  }
}

// parses iso date from server and formats it for date picker
// export function fromISOtoDate(isoDate?: string) {
//   if (isoDate) {
//     // TODO: resolve this dirty hack
//     const date = parseISO(isoDate.replace(" ", "+"));
//     return formatDateWithTimeZone(date);
//   }
//   return null;
// }

// export function fromISOtoDate(isoDate?: string) {
//   if (!isoDate) return null;

//   try {
//     const date = parseISO(isoDate);
//     return format(date, "yyyy-MM-dd"); // Ensures compatibility with DatePickerField
//   } catch (error) {
//     console.log("Invalid ISO date format:", isoDate);
//     return null;
//   }
// }
export function fromISOtoDate(isoDate?: string) {
  if (!isoDate) return null;

  try {
    const date = new Date(isoDate);
    // Use UTC values to avoid local timezone offset issues
    const yyyy = date.getUTCFullYear();
    const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(date.getUTCDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`; // Format: yyyy-MM-dd
  } catch (error) {
    console.log("Invalid ISO date format:", isoDate);
    return null;
  }
}

// export function fromISOtoDateStatic(isoDate?: string) {
//   if (!isoDate) return null;

//   try {
//     const date = parseISO(isoDate);
//     return format(date, "dd.MM.yyyy"); // Adjust format as needed
//   } catch (error) {
//     console.log("Invalid ISO date format:", isoDate);
//     return null;
//   }
// }
export function fromISOtoDateStatic(isoDate?: string) {
  if (!isoDate) return null;

  try {
    const dateOnly = isoDate.split("T")[0]; // "2021-09-19"
    const [year, month, day] = dateOnly.split("-");
    return `${day}.${month}.${year}`;
  } catch (error) {
    console.log("Invalid ISO date format:", isoDate);
    return null;
  }
}

// function formatDate(isoString) {
//   const date = new Date(isoString);

//   const day = String(date.getUTCDate()).padStart(2, "0");
//   const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // getUTCMonth() is zero-based
//   const year = date.getUTCFullYear();

//   return `${day}.${month}.${year}`;
// }

// parses iso date from server and formats it for date picker
export function fromISOtoHourDate(isoDate?: string) {
  const format = "HH:mm, dd. MMMM yyyy";

  if (isoDate) {
    const date = parseISO(isoDate);
    return formatDate(date, format);
  }
  return null;
}

export function formatDateOpenPosition(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 as months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


export function showDate(date:any) {
  const dateDays = moment().diff(date, 'days');
  if (dateDays) return dateDays + 'd';
  const dateHours = moment().diff(date, 'hours');
  if (dateHours) return dateHours + 'h';
  const dateMinutes = moment().diff(date, 'minutes');
  if (dateMinutes) return dateMinutes + 'm';
  const dateSeconds = moment().diff(date, 'seconds');
  if (dateSeconds) return dateSeconds + 's';
  return null;
}
