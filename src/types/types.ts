// section.ts
interface BaseSection {
    id: number;
    type: number;
}

interface TitleSection extends BaseSection {
    type: 1;
    title: string;
    publishDate: string;
}

interface ImageSection extends BaseSection {
    type: 2;
    src: string;
    alt: string;
    width: number;
}

interface ParagraphSection extends BaseSection {
    type: 3;
    title?: string;
    text: string;
}

interface CodeSection extends BaseSection {
    type: 4;
    language: string;
    code: string;
}

export type Section = TitleSection | ImageSection | ParagraphSection | CodeSection;