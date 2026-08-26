import groq from 'groq';

export const MENU_ITEMS_QUERY = groq`
  *[_type == "menuItem"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    section,
    protein,
    dietary,
    tagline,
    description,
    ingredients,
    image,
    pairWith,
    price
  }
`;

export const JOURNAL_POSTS_QUERY = groq`
  *[_type == "journalPost" && status == "published"] | order(datePublished desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    datePublished,
    readingTime,
    metaTitle,
    metaDescription,
    quickAnswer,
    image,
    content
  }
`;

export const JOURNAL_POST_BY_SLUG_QUERY = groq`
  *[_type == "journalPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    datePublished,
    readingTime,
    metaTitle,
    metaDescription,
    quickAnswer,
    image,
    content
  }
`;
