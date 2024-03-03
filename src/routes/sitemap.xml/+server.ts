import { firebaseConfig } from "$lib/consts/firebase_config";
import { getApp, getApps, initializeApp } from "firebase/app";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";

const pages: pagesSiteMap[] = [
  { path: "privacy", priority: "0.3", changefreq: "monthly" },
  { path: "terms-of-use", priority: "0.3", changefreq: "monthly" },
  { path: "orders", priority: "0.1", changefreq: "daily" },
  { path: "profile", priority: "0.2", changefreq: "monthly" },
]; //list of pages as a string ex. ["about", "blog", "contact"]

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
  // const repo = new GeneralRepo();

  const resp = await getDbDoc({
    path: "WebData",
    docId: "businessesSiteMap",
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

async function getDbDoc({ docId, path }: { docId: string; path: string }) {
  try {
    // init the firebase
    const firebaseApp =
      getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    // get the doc
    const collectionRef = collection(getFirestore(), path);
    const docRef = doc(collectionRef, docId);
    return await getDoc(docRef);
  } catch (e) {
    throw e;
  }
}

const sitemap = (
  businesses: businessSiteMap[],
  pages: pagesSiteMap[]
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
    <priority>1.0</priority>
  </url>
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${site}/${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
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
    <lastmod>${business.lastmod}</lastmod>
    <priority>${business.priority}</priority>
  </url>
  `
    )
    .join("")}
</urlset>`;
