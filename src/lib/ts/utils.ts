import type { FormatPostOpts } from "../shared/types/FormatPostOpts";
import type { Post } from "../shared/types/Post";

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

export function formatBlogPosts(posts: Post[], formatPostOpts: FormatPostOpts = {
    filterOutDrafts: true,
    filterOutFuturePosts: true,
    sortByDate: true,
    limit: undefined
}) {
    const filteredPosts = posts.reduce((acc: Post[], post) => {
        // filter out drafts if true
        if (formatPostOpts.filterOutDrafts && post.frontmatter.draft) return acc;

        // filterOutFuturePosts if true
        if (formatPostOpts.filterOutFuturePosts && new Date(post.frontmatter.date) > new Date()) return acc;

        // add post to acc
        acc.push(post);

        return acc;
    }, [])

    // sortByDate or randomize
    if (formatPostOpts.sortByDate) {
        filteredPosts.sort((a) => new Date(a.frontmatter.date).getDate()).reverse()
    } else {
        filteredPosts.sort(() => Math.random() - 0.5)
    }

    // limit if number is passed
    if (formatPostOpts.limit) {
        return filteredPosts.slice(0, formatPostOpts.limit)
    }
    return filteredPosts;
}