const GROUPING_LOCALE = "en-US";
const GROUP_SEPARATOR = " ";

export const groupThousands = (value: number) =>
  value.toLocaleString(GROUPING_LOCALE).replace(/,/g, GROUP_SEPARATOR);
