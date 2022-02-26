export const titleCase = (value: string) =>
    value
        .split(" ")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");

export const separateCameCase = (value: string) => {
    const chars = value.split('');
    let index;
    for (let i = 0; i < chars.length; i++) {
        const caps = /[A-Z]/;
        if (caps.test(chars[i])) {
            index = i;
            break;
        }
    }

    if (!index) return titleCase(value);
    return titleCase(value.slice(0, index)) + ' ' + value.slice(index);
}