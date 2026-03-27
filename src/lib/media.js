export const SITE_BASE_URL = 'https://chronixtechnology.com';
const DEFAULT_COVER_IMAGE = `${SITE_BASE_URL}/images/home_page/chronix-logo.png`;

function toAbsoluteUrl(value) {
  if (!value) return '';
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  if (value.startsWith('/')) return `${SITE_BASE_URL}${value}`;
  return `${SITE_BASE_URL}/${value}`;
}

export function resolvePostCoverImage(postData, options = {}) {
  const { useDefault = true, absolute = false } = options;
  const chosen = postData?.coverImageUrl || (useDefault ? DEFAULT_COVER_IMAGE : '');
  if (!chosen) return '';
  return absolute ? toAbsoluteUrl(chosen) : chosen;
}

export function resolvePostCoverAlt(postData) {
  return postData?.coverImageAlt || postData?.title || 'Chronix Technology blog image';
}