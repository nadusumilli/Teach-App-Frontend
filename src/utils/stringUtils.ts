export const titleCase = (value: string) =>
    value
        .split(" ")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");

export const separateSnakeCase = (value: string) => value
    .split("_")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");