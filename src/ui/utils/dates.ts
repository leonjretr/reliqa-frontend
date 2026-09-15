export const formatYear = (isoDate: string) => String(new Date(isoDate).getFullYear());

export const yearsSince = (year: number) => new Date().getFullYear() - year;
