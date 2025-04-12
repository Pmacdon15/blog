import { Key, JSX } from "react";

// src/types/types.ts
export interface Section {
  map(arg0: (section: Section, index: Key | null | undefined) => JSX.Element | undefined): import("react").ReactNode;
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

export interface FormActionInputUpdate {
  formData: FormData;
  sectionId: number;
  sectionTypeId: number;
}

export interface FormActionInputDelete {
  sectionId: number;
}
export interface FormActionProps {
  formActionUpdate: (input: FormActionInputUpdate) => void;
  formActionDelete: (input: FormActionInputDelete) => void;
}