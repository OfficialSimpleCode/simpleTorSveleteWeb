enum WindowSpaces {
    shortestTreatment,
    longestTreatment,
    custom,
    first,
    last,
    edges,
  }
  
  const windowSpacesToStr: Record<WindowSpaces, string> = {
    [WindowSpaces.first]: "first",
    [WindowSpaces.last]: "last",
    [WindowSpaces.edges]: "edges",
    [WindowSpaces.shortestTreatment]: "shortestTreatment",
    [WindowSpaces.longestTreatment]: "longestTreatment",
    [WindowSpaces.custom]: "custom",
  };
  
  const windowSpacesFromStr: Record<string, WindowSpaces> = {
    "first": WindowSpaces.first,
    "last": WindowSpaces.last,
    "edges": WindowSpaces.edges,
    "shortestTreatment": WindowSpaces.shortestTreatment,
    "longestTreatment": WindowSpaces.longestTreatment,
    "custom": WindowSpaces.custom,
  };
  
  const windowbyRecommedation: Record<WindowSpaces, string> = {
    [WindowSpaces.first]: "forNewBusiness",
    [WindowSpaces.last]: "forNewBusiness",
    [WindowSpaces.edges]: "ForSmallBusinesses",
    [WindowSpaces.shortestTreatment]: "mostBusinesses",
    [WindowSpaces.longestTreatment]: "mostBusinesses",
    [WindowSpaces.custom]: "notRecommended",
  };
  