export interface Post {
    frontmatter: Frontmatter;
}

interface Frontmatter {
    layout: string;
    title: string;
    date: string;
    image: Image;
    description: string;
    draft: boolean;
    category: string;
}

interface Image {
    src: string;
    alt: string;
}