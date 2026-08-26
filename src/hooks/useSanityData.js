import { useState, useEffect } from 'react';
import { client } from '../lib/sanity/client';
import { urlFor } from '../lib/sanity/image';
import { MENU_ITEMS_QUERY, JOURNAL_POSTS_QUERY } from '../lib/sanity/queries';
import { UMAMI_MENU_ITEMS } from '../data/umamiMenuData';
import { UMAMI_JOURNAL_POSTS } from '../data/umamiJournalData';

export function useSanityMenu() {
  const [items, setItems] = useState(UMAMI_MENU_ITEMS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    client
      .fetch(MENU_ITEMS_QUERY)
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          // Normalize sanity items with image url
          const normalized = data.map((item) => ({
            ...item,
            id: item.slug || item._id,
            sectionId: item.section || 'burgers',
            image: item.image ? urlFor(item.image).auto('format').width(1000).url() : null,
          }));
          setItems(normalized);
        }
      })
      .catch((err) => {
        console.warn('Sanity menu fetch fallback:', err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { items, loading };
}

export function useSanityJournal() {
  const [posts, setPosts] = useState(UMAMI_JOURNAL_POSTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    client
      .fetch(JOURNAL_POSTS_QUERY)
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          const normalized = data.map((post) => ({
            ...post,
            id: post.slug || post._id,
            image: post.image ? urlFor(post.image).auto('format').width(1200).url() : null,
          }));
          setPosts(normalized);
        }
      })
      .catch((err) => {
        console.warn('Sanity journal fetch fallback:', err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { posts, loading };
}
