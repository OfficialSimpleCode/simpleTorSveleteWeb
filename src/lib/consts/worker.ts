export enum WindowSpaces {
  shortestTreatment,
  longestTreatment,
  custom,
  first,
  last,
  edges,
}

export const windowSpacesToStr: Record<WindowSpaces, string> = {
  [WindowSpaces.first]: "first",
  [WindowSpaces.last]: "last",
  [WindowSpaces.edges]: "edges",
  [WindowSpaces.shortestTreatment]: "shortestTreatment",
  [WindowSpaces.longestTreatment]: "longestTreatment",
  [WindowSpaces.custom]: "custom",
};

export const windowSpacesFromStr: Record<string, WindowSpaces> = {
  first: WindowSpaces.first,
  last: WindowSpaces.last,
  edges: WindowSpaces.edges,
  shortestTreatment: WindowSpaces.shortestTreatment,
  longestTreatment: WindowSpaces.longestTreatment,
  custom: WindowSpaces.custom,
};

export const windowbyRecommedation: Record<WindowSpaces, string> = {
  [WindowSpaces.first]: "forNewBusiness",
  [WindowSpaces.last]: "forNewBusiness",
  [WindowSpaces.edges]: "ForSmallBusinesses",
  [WindowSpaces.shortestTreatment]: "mostBusinesses",
  [WindowSpaces.longestTreatment]: "mostBusinesses",
  [WindowSpaces.custom]: "notRecommended",
};
