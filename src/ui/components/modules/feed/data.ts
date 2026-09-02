export type Stock = { bg: string; fg: string };

export type Story = {
  slug: string;
  keeperSlug: string;
  name: string;
  place: string;
  year: string;
  relation: string;
  model: string;
  objectSlug?: string;
  category: string;
  kind: string;
  keepers: number;
  held: string;
  text: string;
  body: string[];
  photo?: string;
};

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

export type KeptItem = {
  objectSlug: string;
  name: string;
  category: string;
  year: string;
  stock: number;
};

export type Keeper = {
  slug: string;
  name: string;
  place: string;
  since: string;
  avatar?: string;
  bio?: string;
  kept: KeptItem[];
};

export type Category = { name: string; slug: string; count: string; stock: number };

export const STOCK: Stock[] = [
  { bg: "#96382a", fg: "#f7efe7" },
  { bg: "#b3822c", fg: "#1f1a15" },
  { bg: "#63304a", fg: "#f6e9ee" },
  { bg: "#4a5a33", fg: "#f1f3e6" },
  { bg: "#3b4a55", fg: "#eef1f3" },
  { bg: "#ded4c0", fg: "#1f1a15" },
];

export const STORIES: Story[] = [
  {
    slug: "marta-ilves-zenit-e",
    keeperSlug: "marta-ilves",
    name: "Marta Ilves",
    place: "Tartu",
    year: "1974",
    relation: "her grandmother’s",
    model: "Zenit-E",
    objectSlug: "zenit-e",
    category: "cameras",
    kind: "35 mm camera",
    keepers: 8412,
    held: "52 years",
    text: "It lived above the radio and nobody was allowed to touch it, which is how I learned that some objects are people.",
    body: [
      "My grandmother kept it on the high shelf above the radio, in a leather case that smelled of her flat, and every birthday of my childhood was photographed with it. I was not allowed to hold it until I was twelve, and by then I wanted to more than I had ever wanted a toy.",
      "She is gone and the flat is gone and the radio is gone. The camera still winds, still fires, still lies to me about the light exactly the way it lied to her. I have not put film in it for years. I take it down anyway, most winters, and hold it until my hands are warm.",
    ],
  },
  {
    slug: "kaia-lepik-moka",
    keeperSlug: "kaia-lepik",
    name: "Kaia Lepik",
    place: "Tallinn",
    year: "2004",
    relation: "found at home",
    model: "Moka Express",
    objectSlug: "moka-express",
    category: "kitchen",
    kind: "coffee pot",
    keepers: 2951,
    held: "22 years",
    text: "My mother never washed the inside and told me washing it was the only way to ruin it.",
    body: [
      "There are three of them on the same shelf, in three sizes, and I only ever use the middle one. The small one was for when it was just her. The large one came out at Christmas and for arguments. I inherited the whole set and the instructions, which were: never soap, never scrub, never lend it.",
      "People who visit try to be helpful and reach for it at the sink. I have learned to intercept them the way you intercept a child near a stove. It is twenty-two years of coffee in there. You do not wash away twenty-two years to be polite.",
    ],
  },
  {
    slug: "priit-saar-nokia",
    keeperSlug: "priit-saar",
    name: "Priit Saar",
    place: "Tallinn",
    year: "2001",
    relation: "bought new",
    model: "Nokia 3310",
    objectSlug: "nokia-3310",
    category: "phones",
    kind: "mobile phone",
    keepers: 4103,
    held: "25 years",
    text: "The only high score my brother never beat is still on it, and I will not risk the battery to check.",
    body: [
      "It was the first thing I ever bought that was only mine. I saved a summer of pumping petrol for it. My brother and I passed it back and forth playing Snake until our thumbs ached, and somewhere in the autumn I set a score he never once beat, and never stopped trying to.",
      "He would deny it now. That is exactly why I keep it. The battery is a decade past holding a charge and I will not risk plugging it in, in case the score is gone. As long as I do not check, it is still there, and I am still winning.",
    ],
  },
  {
    slug: "anna-rozite-zenit-e",
    keeperSlug: "anna-rozite",
    name: "Anna Rozīte",
    place: "Riga",
    year: "1988",
    relation: "her father’s",
    model: "Zenit-E",
    objectSlug: "zenit-e",
    category: "cameras",
    kind: "35 mm camera",
    keepers: 8412,
    held: "38 years",
    text: "My father taught me to load film in the dark of the bathroom. He got the frame counter wrong every single time and blamed the camera.",
    body: [
      "The bathroom was the darkroom because it was the only room with no window. He would drape a coat over the door gap, kill the light, and put the cold body of the camera into my hands, and I learned the whole loading of it by feel before I ever saw it done.",
      "He never trusted the frame counter and it never once agreed with him. Thirty-eight years later I still count my own frames under my breath, out of superstition more than need, in a voice that is halfway his.",
    ],
  },
  {
    slug: "elin-haas-singer",
    keeperSlug: "elin-haas",
    name: "Elin Haas",
    place: "Viljandi",
    year: "1968",
    relation: "inherited",
    model: "Singer 15",
    objectSlug: "singer-15",
    category: "sewing",
    kind: "sewing machine",
    keepers: 2210,
    held: "58 years",
    text: "Four moves. Every time somebody asks whether it is coming and every time the answer is yes.",
    body: [
      "It weighs as much as a child and it has no earthly reason to leave the room it is in, and it has left every room I have ever left. Removal men sigh at it. My family sighs at it. I have paid, more than once, for a second person on the stairs purely because of this machine.",
      "I could buy a plastic one that does more in an afternoon. But you do not keep a thing because it is efficient. You keep it because putting it down would be the same as agreeing you are finished, and I am not.",
    ],
  },
  {
    slug: "marta-ilves-braun",
    keeperSlug: "marta-ilves",
    name: "Marta Ilves",
    place: "Tartu",
    year: "1979",
    relation: "a gift",
    model: "Braun SK4",
    objectSlug: "braun-sk4",
    category: "record players",
    kind: "record player",
    keepers: 1560,
    held: "47 years",
    text: "The lid alone taught me what a designed object could be. I keep it shut.",
    body: [
      "They called it Snow White’s Coffin for the clear lid, and the first time I lowered that lid I understood, without any words for it yet, that someone had thought about my hands. Nothing before it in the flat had been designed. It had all simply been made.",
      "It plays perfectly. I almost never play it. It sits closed under its lid like a held breath, and the point of it, for me, was never the music — it was the proof that an ordinary object could be built as though the person using it mattered.",
    ],
  },
  {
    slug: "juhan-kask-smena",
    keeperSlug: "juhan-kask",
    name: "Juhan Kask",
    place: "Pärnu",
    year: "1982",
    relation: "bought at a market",
    model: "Smena 8M",
    category: "cameras",
    kind: "35 mm camera",
    keepers: 8412,
    held: "44 years",
    text: "Flea market, the price of a coffee. The strap smells of someone else’s house and I have decided not to mind.",
    body: [
      "It cost less than the coffee I drank while haggling for it. The woman selling it could not tell me a single thing about it, which I have come to think of as a gift rather than a loss — it arrived with no story attached, so it took on mine.",
      "The strap still smells faintly of a house I have never been inside. For a while that bothered me. Now I like it. Someone loaded film into this and photographed a life I will never know, and then it became the thing I photographed mine with.",
    ],
  },
  {
    slug: "kaia-lepik-zenit-e",
    keeperSlug: "kaia-lepik",
    name: "Kaia Lepik",
    place: "Tallinn",
    year: "2004",
    relation: "found at home",
    model: "Zenit-E",
    objectSlug: "zenit-e",
    category: "cameras",
    kind: "35 mm camera",
    keepers: 8412,
    held: "22 years",
    text: "Found it in my mother’s wardrobe with a roll still inside. Twelve frames of people I never met, and one of a kitchen I do.",
    body: [
      "It was behind the winter coats with a roll still loaded, and I did the reckless thing and had the film developed. Twelve exposures came back: strangers at a table, a garden, a man laughing at whoever held the camera.",
      "And the thirteenth was our kitchen. The same kitchen, thirty years younger, with a woman in it I slowly understood was my mother before she was my mother. I keep the camera for that one frame, and for whatever else it is still holding that I have not been brave enough to wind on.",
    ],
  },
  {
    slug: "toomas-vali-fed-5",
    keeperSlug: "toomas-vali",
    name: "Toomas Väli",
    place: "Narva",
    year: "1991",
    relation: "sold on",
    model: "FED 5",
    category: "cameras",
    kind: "35 mm camera",
    keepers: 8412,
    held: "held 6 years",
    text: "I sold mine to buy a bus ticket out. I think about that trade more often than I should.",
    body: [
      "I had six years with it and one morning I needed a bus ticket more than I needed a camera, so I sold it on a wet pavement to a man who did not haggle, which told me he knew what he had.",
      "The ticket got me out and the getting out was the right decision and I do not regret it. I regret the camera. This is the only story I have where the object is gone and the keeping is the missing of it, and I wanted it counted anyway.",
    ],
  },
  {
    slug: "dario-pini-olympus",
    keeperSlug: "dario-pini",
    name: "Dario Pini",
    place: "Trieste",
    year: "2011",
    relation: "a gift",
    model: "Olympus Trip 35",
    category: "cameras",
    kind: "35 mm camera",
    keepers: 8412,
    held: "15 years",
    text: "My flatmate left it behind with a note saying it was easier than posting it. I have photographed nothing important with it and use it constantly.",
    body: [
      "He moved out in a hurry and left it on the counter with a note: easier than posting it. That was the whole note. We were not especially close and I have not heard from him since, and yet here is his camera, fifteen years in my hands.",
      "I have never taken a single important photograph with it. Birthdays and weddings I shoot on my phone like everyone. This one is for the walk to the bakery, the cat on the wall, the light on a Tuesday — the nothing that turns out to have been the something.",
    ],
  },
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

export const KEEPERS: Keeper[] = [
  {
    slug: "marta-ilves",
    name: "Marta Ilves",
    place: "Tartu",
    since: "1974",
    bio: "I keep the things other people would have thrown out. Cameras that no longer see, a coffee pot nobody is allowed to wash. Mostly I keep the hands that held them first.",
    kept: [
      { objectSlug: "zenit-e", name: "Zenit-E", category: "cameras", year: "1974", stock: 0 },
      { objectSlug: "singer-15", name: "Singer 15", category: "sewing", year: "1968", stock: 3 },
      {
        objectSlug: "braun-sk4",
        name: "Braun SK4",
        category: "record players",
        year: "1979",
        stock: 1,
      },
      {
        objectSlug: "moka-express",
        name: "Moka Express",
        category: "kitchen",
        year: "1981",
        stock: 2,
      },
    ],
  },
  {
    slug: "anna-rozite",
    name: "Anna Rozīte",
    place: "Riga",
    since: "1988",
    bio: "My father taught me every old thing by feel, in the dark, before he let me look at it.",
    kept: [{ objectSlug: "zenit-e", name: "Zenit-E", category: "cameras", year: "1988", stock: 2 }],
  },
  {
    slug: "kaia-lepik",
    name: "Kaia Lepik",
    place: "Tallinn",
    since: "2003",
    bio: "Inheritor by accident. Everything I keep was found rather than chosen — behind coats, at the back of wardrobes, on a shelf I was told never to touch.",
    kept: [
      {
        objectSlug: "moka-express",
        name: "Moka Express",
        category: "kitchen",
        year: "2004",
        stock: 0,
      },
      { objectSlug: "zenit-e", name: "Zenit-E", category: "cameras", year: "2004", stock: 3 },
      { objectSlug: "nokia-3310", name: "Nokia 3310", category: "phones", year: "2003", stock: 1 },
    ],
  },
  {
    slug: "toomas-vali",
    name: "Toomas Väli",
    place: "Narva",
    since: "1991",
    kept: [{ objectSlug: "zenit-e", name: "Zenit-E", category: "cameras", year: "1991", stock: 1 }],
  },
  {
    slug: "juhan-kask",
    name: "Juhan Kask",
    place: "Pärnu",
    since: "1982",
    kept: [{ objectSlug: "zenit-e", name: "Zenit-E", category: "cameras", year: "1982", stock: 4 }],
  },
  {
    slug: "dario-pini",
    name: "Dario Pini",
    place: "Trieste",
    since: "1984",
    kept: [
      {
        objectSlug: "braun-sk4",
        name: "Braun SK4",
        category: "record players",
        year: "1984",
        stock: 2,
      },
    ],
  },
  {
    slug: "priit-saar",
    name: "Priit Saar",
    place: "Tallinn",
    since: "2001",
    kept: [
      { objectSlug: "nokia-3310", name: "Nokia 3310", category: "phones", year: "2001", stock: 4 },
    ],
  },
  {
    slug: "elin-haas",
    name: "Elin Haas",
    place: "Viljandi",
    since: "1968",
    kept: [
      { objectSlug: "singer-15", name: "Singer 15", category: "sewing", year: "1968", stock: 0 },
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

export const CURRENT_KEEPER_SLUG = "marta-ilves";

export const groupThousands = (value: number) => value.toLocaleString("en-US").replace(/,/g, " ");

export const getObject = (slug: string) => OBJECTS.find((item) => item.slug === slug) ?? null;

export const getKeeper = (slug: string) => KEEPERS.find((item) => item.slug === slug) ?? null;

export const getStory = (slug: string) => STORIES.find((item) => item.slug === slug) ?? null;

export const getKeeperStories = (slug: string) =>
  STORIES.filter((story) => story.keeperSlug === slug);

export const hasObjectPage = (slug?: string) =>
  slug !== undefined && OBJECTS.some((item) => item.slug === slug);
