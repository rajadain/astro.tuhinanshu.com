function isPositiveInteger(pathFragment: string): Boolean {
  return /^\d+$/.test(pathFragment);
}

function getBreadcrumbs(currentUrlPath: String): String[] {
  // Get url array from path
  // eg: /tags/tailwindcss => ['tags', 'tailwindcss']
  const breadcrumbList = currentUrlPath.split("/").slice(1);

  // if breadcrumb is Home > Posts > 1 <etc>
  // replace Posts with Posts (page number)
  if (breadcrumbList[0] === "posts" && isPositiveInteger(breadcrumbList[1])) {
    breadcrumbList.splice(0, 2, `Posts (page ${breadcrumbList[1] || 1})`);
  }

  return breadcrumbList;
}

export default getBreadcrumbs;
