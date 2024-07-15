export interface Post {
    frontmatter: Frontmatter;
    url: string;
}

interface Frontmatter {
    layout: string;
    title: string;
    date: string;
    image: Image;
    description: string;
    draft: boolean;
    category: string;
    author: string;
}

interface Image {
    src: string;
    alt: string;
}