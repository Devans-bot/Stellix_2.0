// --- src/lib/pinPreviewCache.js ---
export const pinPreviewCache = new Map();

export const getCachedPin = (id) => pinPreviewCache.get(id);
export const setCachedPin = (id, data) => pinPreviewCache.set(id, data);
export const hasCachedPin = (id) => pinPreviewCache.has(id);
