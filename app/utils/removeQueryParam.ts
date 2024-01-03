export const removeQueryParam = (param: string) => {
  const url = new URL(window.location.href);
  url.searchParams.delete(param);

  history.replaceState({}, '', url.toString());
};
