import { defineQuery } from "next-sanity";

export const ITEMS_QUERY = 
  defineQuery(`*[_type == "item" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
    _id, 
    title, 
    slug,
    _createdAt,
    author -> {
      _id, 
      name, 
      image, 
      bio
    }, 
    views,
    description,
    category,
    image,
  }`);

  // don't change the 'author._ref' to 'author._id' in the query below, it will not work
export const ITEMS_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "item" && author._ref == $id] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
}`);

export const ITEMS_BY_AUTHOR_NAME_QUERY =
  defineQuery(`*[_type == "item" && author->name == $name] | order(_createdAt desc) {
  _id, 
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
}`);

export const ITEM_BY_ID_QUERY =
  defineQuery(`*[_type == "item" && _id == $id][0]{
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, username, image, bio
  }, 
  views,
  description,
  category,
  image,
  details,
}`);

export const ITEM_VIEWS_QUERY = defineQuery(`
    *[_type == "item" && _id == $id][0]{
        _id, views
    }
`);

interface Playlist {
  _id: string;
  title: string;
  slug: { current: string };
  select?: Array<{
    _id: string;
    _createdAt: string;
    title: string;
    slug: { current: string };
    author: {
      _id: string;
      name: string;
      slug: { current: string };
      image?: any; // Adjust based on your schema
      bio?: string;
    };
    views?: number;
    description?: string;
    category?: string;
    image?: any;
    details?: any;
  }>;
}

export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    details
  }
}`);

export const PLAYLIST_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    details
  }
}`);

export const AUTHOR_BY_ID_QUERY = defineQuery(`
*[_type == "author" && _id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}
`);


export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
*[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}
`);