export const slugify = (...args: string[]): string => {
    const value = args.join(' ')

    return value
        .normalize('NFD') // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
        .replace(/\s+/g, '-') // separator
}

export function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", { timeZone: "UTC" });
}

export function getImage(imageSrc: string) {
    const images = import.meta.glob<{ default: ImageMetadata }>(
        "/src/assets/*.{jpeg,jpg,png,gif}",
    );

    if (!images[imageSrc])
        throw new Error(
            `"${imageSrc}" does not exist in glob: "/src/assets/*.{jpeg,jpg,png,gif}"`,
        );

    return images[imageSrc]();
}