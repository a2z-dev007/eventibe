export interface CategoryDetail {
    id?: number;
    name?: string;
    created?: string;
}

export interface Welcome {
    id?: number;
    title?: string;
    slug?: string;
    category_detail?: CategoryDetail;
    blog_tag?: CategoryDetail[];
    content?: string;
    file?: string | null;
    key_name?: string | null;
    status?: string;
    user?: any | null;
    meta_title?: string;
    meta_keywords?: string;
    meta_description?: string;
    meta_tags?: string;
    published_date?: string;
    applicable_for?: string;
    blog_writer?: string;
    created_by?: any | null;
    created?: string;
}

export type Blog = Welcome;

export interface BlogListResponse {
    totalRecords: number;
    status: string;
    records: Blog[];
}
