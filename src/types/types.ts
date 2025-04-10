export interface Section {
    id: number;
    blog_id: number;
    section_type_id: number;
    section_type: 'title' | 'image' | 'paragraph' | 'code';
    title_section_title: string | null;
    publish_date: string | null;
    src: string | null;
    alt: string | null;
    width: number | null;
    paragraph_title: string | null;
    text: string | null;
    language: string | null;
    code: string | null;
  }