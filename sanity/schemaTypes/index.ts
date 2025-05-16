import { type SchemaTypeDefinition } from 'sanity'

import { author } from "@/sanity/schemaTypes/author";
import { item } from '@/sanity/schemaTypes/item';
import { playlist } from '@/sanity/schemaTypes/playlist';


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, item, playlist ],
};
