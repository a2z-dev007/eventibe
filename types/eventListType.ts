

export interface EventListType {
    id:                       number;
    name:                     string;
    description:              string;
    order:                    number;
    listing:                  number;
    slug:                     string;
    venue_type:               AmenitiesDetail[];
    event_type:               AmenitiesDetail[];
    contact_details:          ContactDetail[];
    venue_services:           number[];
    services_details:         SDetail[];
    venue_cuisines:           number[];
    cuisine_details:          AmenitiesDetail[];
    venue_amenities:          number[];
    amenities_details:        AmenitiesDetail[];
    venue_terms_conditions:   number[];
    terms_conditions_details: SDetail[];
    venue_highlights:         number[];
    highlights_details:       SDetail[];
    package_details:          PackageDetail[];
    images:                   Image[];
    address:                  string;
    city_id:                  number;
    city_name:                string;
    state_id:                 number;
    state_name:               string;
    country_id:               number;
    country_name:             string;
    country_short_name:       string;
    location_name:            null;
    location_id:              null;
    lat:                      number;
    lon:                      number;
    meta_title:               string;
    meta_keywords:            string;
    meta_description:         string;
    meta_tags:                string;
    videos:                   any[];
    is_hotel_venue:           boolean;
    venue_chain:              number;
    venue_configuration:      AmenitiesDetail[];
    menu_details:             MenuDetail[];
    logo_details:             LogoDetail[];
    created:                  Date;
    created_by:               number;
    status:                   boolean;
    status_remark:            string;
    show_on_homepage:         boolean;
    show_popular:             boolean;
}

export interface AmenitiesDetail {
    id:                number;
    name:              string;
    file:              null | string;
    key_name:          null | string;
    created:           Date;
    created_by:        number;
    description?:      string;
    name_hindi?:       string;
    category?:         string;
    show_on_homepage?: boolean;
}

export interface ContactDetail {
    id:           number;
    name:         string;
    email:        string;
    mobile:       string;
    contact_type: string;
}

export interface SDetail {
    id:           number;
    name:         string;
    created:      Date;
    created_by:   number;
    description?: string;
}

export interface Image {
    id:            number;
    file:          string;
    cover_photo:   boolean;
    images_tag:    any[];
    order:         number;
    status:        number;
    status_remark: null;
}

export interface LogoDetail {
    id:         number;
    venue_id:   number;
    venue_name: string;
    file:       string;
    key_name:   string;
    alt_text:   string;
    is_active:  boolean;
    created:    Date;
    updated:    Date;
}

export interface MenuDetail {
    id:              number;
    venue:           number;
    venue_name:      string;
    name:            string;
    suitable_for:    string;
    file:            string;
    key_name:        string;
    created:         Date;
    updated:         Date;
    deleted:         boolean;
    created_by:      number;
    created_by_name: string;
}

export interface PackageDetail {
    id:                 number;
    venue:              number;
    venue_name:         string;
    file:               string;
    key_name:           string;
    name:               string;
    suitable_for:       string;
    description:        string;
    dishes:             number[];
    venue_dish_details: VenueDishDetail[];
    event_types:        any[];
    event_type_details: any[];
    created:            Date;
    status:             boolean;
    status_remark:      null;
    created_by:         number;
}

export interface VenueDishDetail {
    id:   number;
    name: string;
}
