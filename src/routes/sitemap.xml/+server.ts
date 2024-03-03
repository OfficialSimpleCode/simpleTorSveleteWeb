import GeneralRepo from "$lib/helpers/general/general_repo";

const pages: string[] = ["privacy", "terms-of-use", "orders", "profile"]; //list of pages as a string ex. ["about", "blog", "contact"]

const site: string = "https://simpletor.app";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }: { url: string }) {
  let businesses: businessSiteMap[] = await getBusinessesFromDB(); //list of posts containing a slug [{title: "Test title", slug: "test-title", updatedAt: "2023-01-01"}]
  const body = sitemap(businesses, pages);
  const response = new Response(body);
  response.headers.set("Cache-Control", "max-age=0, s-maxage=3600");
  response.headers.set("Content-Type", "application/xml");
  return response;
}

async function getBusinessesFromDB(): Promise<businessSiteMap[]> {
  let businessesList: businessSiteMap[] = [];
  const repo = new GeneralRepo();
  const resp = await repo.getDocRepo({
    path: "WebData",
    docId: "businessesSiteMap",
    insideEnviroments: false,
  });
  console.log("resp -> ", resp);
  // error occured
  if (!resp.exists()) {
    return businessesList;
  }

  // extracting the businesses data
  Object.entries(resp.data() as Record<string, any>).forEach(
    ([businessId, siteMapData]) => {
      businessesList.push(siteMapData as businessSiteMap);
    }
  );
  return businessesList;
}

const sitemap = (
  businesses: businessSiteMap[],
  pages: string[]
) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  <url>
    <loc>${site}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${site}/${page}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  `
    )
    .join("")}
  ${businesses
    .map((business) =>
      business.visible
        ? null
        : `
  <url>
    <loc>${site}/business/${business.slug}</loc>
    <changefreq>weekly</changefreq>
    <lastmod>${business.updatedAt}</lastmod>
    <priority>0.3</priority>
  </url>
  `
    )
    .join("")}
</urlset>`;
