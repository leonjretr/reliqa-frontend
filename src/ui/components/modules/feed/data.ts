export type Stock = { bg: string; fg: string };

export type Fact = { label: string; value: string };

export type StuckOn = {
  keeperSlug: string;
  name: string;
  place: string;
  year: string;
  text: string;
  stock: number;
};

export type Decade = { label: string; count: number };

export type ObjectDetail = {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  year: string;
  keepers: number;
  blurb: string;
  facts: Fact[];
  decades: Decade[];
  stuckOn: StuckOn[];
};

export type Category = {
  name: string;
  slug: string;
  count: string;
  stock: number;
  photo?: string;
};

export const STOCK: Stock[] = [
  { bg: "#96382a", fg: "#f7efe7" },
  { bg: "#b3822c", fg: "#1f1a15" },
  { bg: "#63304a", fg: "#f6e9ee" },
  { bg: "#4a5a33", fg: "#f1f3e6" },
  { bg: "#3b4a55", fg: "#eef1f3" },
  { bg: "#ded4c0", fg: "#1f1a15" },
];

export const OBJECTS: ObjectDetail[] = [
  {
    slug: "zenit-e",
    name: "Zenit-E",
    category: "cameras",
    categorySlug: "cameras",
    year: "1965",
    keepers: 41,
    blurb: "The most-produced SLR ever built. Eight million of them, and no batteries.",
    facts: [
      { label: "made", value: "1965–86" },
      { label: "by", value: "KMZ" },
      { label: "of", value: "steel · brass" },
    ],
    decades: [
      { label: "60s", count: 3 },
      { label: "70s", count: 9 },
      { label: "80s", count: 14 },
      { label: "90s", count: 7 },
      { label: "00s", count: 5 },
      { label: "10s", count: 3 },
    ],
    stuckOn: [
      {
        keeperSlug: "marta-ilves",
        name: "Marta Ilves",
        place: "Tartu",
        year: "1974",
        stock: 0,
        text: "It lived above the radio and nobody was allowed to touch it.",
      },
      {
        keeperSlug: "anna-rozite",
        name: "Anna Rozīte",
        place: "Riga",
        year: "1988",
        stock: 2,
        text: "My father taught me to load film in the dark of the bathroom.",
      },
      {
        keeperSlug: "kaia-lepik",
        name: "Kaia Lepik",
        place: "Tallinn",
        year: "2004",
        stock: 3,
        text: "Found it in my mother’s wardrobe with a roll still inside.",
      },
      {
        keeperSlug: "toomas-vali",
        name: "Toomas Väli",
        place: "Narva",
        year: "1991",
        stock: 1,
        text: "I sold mine to buy a bus ticket out.",
      },
    ],
  },
  {
    slug: "nokia-3310",
    name: "Nokia 3310",
    category: "phones",
    categorySlug: "phones",
    year: "2000",
    keepers: 88,
    blurb: "The phone people kept not because it worked, but because it survived them.",
    facts: [
      { label: "made", value: "2000–05" },
      { label: "by", value: "Nokia" },
      { label: "of", value: "polycarbonate" },
    ],
    decades: [
      { label: "00s", count: 51 },
      { label: "10s", count: 28 },
      { label: "20s", count: 9 },
    ],
    stuckOn: [
      {
        keeperSlug: "priit-saar",
        name: "Priit Saar",
        place: "Tallinn",
        year: "2001",
        stock: 4,
        text: "The only high score my brother never beat is still on it.",
      },
      {
        keeperSlug: "kaia-lepik",
        name: "Kaia Lepik",
        place: "Tallinn",
        year: "2003",
        stock: 1,
        text: "First number I ever memorised was typed into this.",
      },
    ],
  },
  {
    slug: "braun-sk4",
    name: "Braun SK4",
    category: "record players",
    categorySlug: "record-players",
    year: "1956",
    keepers: 12,
    blurb: "Nicknamed Snow White’s Coffin. Kept by people who mostly do not play records.",
    facts: [
      { label: "made", value: "1956–63" },
      { label: "by", value: "Braun" },
      { label: "of", value: "steel · wood" },
    ],
    decades: [
      { label: "50s", count: 2 },
      { label: "60s", count: 4 },
      { label: "70s", count: 3 },
      { label: "80s", count: 3 },
    ],
    stuckOn: [
      {
        keeperSlug: "marta-ilves",
        name: "Marta Ilves",
        place: "Tartu",
        year: "1979",
        stock: 1,
        text: "The lid alone taught me what a designed object could be.",
      },
      {
        keeperSlug: "dario-pini",
        name: "Dario Pini",
        place: "Trieste",
        year: "1984",
        stock: 2,
        text: "It plays. I keep it shut anyway.",
      },
    ],
  },
  {
    slug: "moka-express",
    name: "Moka Express",
    category: "kitchen",
    categorySlug: "kitchen",
    year: "1933",
    keepers: 63,
    blurb: "Inherited more often than any other object in the kitchen. Never washed inside.",
    facts: [
      { label: "made", value: "1933–now" },
      { label: "by", value: "Bialetti" },
      { label: "of", value: "aluminium" },
    ],
    decades: [
      { label: "50s", count: 6 },
      { label: "70s", count: 12 },
      { label: "90s", count: 21 },
      { label: "10s", count: 24 },
    ],
    stuckOn: [
      {
        keeperSlug: "kaia-lepik",
        name: "Kaia Lepik",
        place: "Tallinn",
        year: "2004",
        stock: 0,
        text: "My mother said washing the inside was the only way to ruin it.",
      },
      {
        keeperSlug: "marta-ilves",
        name: "Marta Ilves",
        place: "Tartu",
        year: "1981",
        stock: 3,
        text: "Three sizes of it live on the same shelf. I only use the middle one.",
      },
    ],
  },
  {
    slug: "singer-15",
    name: "Singer 15",
    category: "sewing",
    categorySlug: "sewing",
    year: "1895",
    keepers: 28,
    blurb: "Heavy enough that keeping it is a decision you make repeatedly.",
    facts: [
      { label: "made", value: "1895–1950s" },
      { label: "by", value: "Singer" },
      { label: "of", value: "cast iron" },
    ],
    decades: [
      { label: "20s", count: 4 },
      { label: "40s", count: 7 },
      { label: "60s", count: 11 },
      { label: "80s", count: 6 },
    ],
    stuckOn: [
      {
        keeperSlug: "elin-haas",
        name: "Elin Haas",
        place: "Viljandi",
        year: "1968",
        stock: 0,
        text: "Four moves and every time the answer is yes, it comes.",
      },
      {
        keeperSlug: "marta-ilves",
        name: "Marta Ilves",
        place: "Tartu",
        year: "1968",
        stock: 2,
        text: "My grandmother’s treadle. I have never sewn a straight line on it.",
      },
    ],
  },
];

export const CATEGORIES: Category[] = [
  { name: "cameras", slug: "cameras", count: "41 things", stock: 0 },
  { name: "kitchen", slug: "kitchen", count: "63 things", stock: 1 },
  { name: "record players", slug: "record-players", count: "12 things", stock: 2 },
  { name: "sewing", slug: "sewing", count: "28 things", stock: 3 },
  { name: "phones", slug: "phones", count: "88 things", stock: 5 },
  { name: "radios", slug: "radios", count: "19 things", stock: 4 },
];

export const groupThousands = (value: number) => value.toLocaleString("en-US").replace(/,/g, " ");
