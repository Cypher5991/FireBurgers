// Browser-safe publishable Sanity environment configuration
export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'u0jvlr9x';
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2026-08-26';
export const studioUrl = import.meta.env.VITE_SANITY_STUDIO_URL || 'http://localhost:3333';
