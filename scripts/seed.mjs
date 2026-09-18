// One-shot seed script for the Reliqa backend. Run manually:
//
//   node scripts/seed.mjs
//
// Registers a handful of fictional keeper accounts and writes their objects
// against the live categories. Not idempotent — re-running it creates
// duplicate objects (registration of an already-existing keeper is tolerated
// and just falls through to login).

const BASE_URL = "https://api.reliqa.space/api/v1/";
const SEED_PASSWORD = "Reliqa-Seed-2026!";

const KEEPERS = [
  {
    slug: "marta-ilves",
    firstName: "Marta",
    lastName: "Ilves",
    place: "Tartu",
    bio: "I keep the things other people would have thrown out. Mostly I keep the hands that held them first.",
  },
  {
    slug: "anna-rozite",
    firstName: "Anna",
    lastName: "Rozīte",
    place: "Riga",
    bio: "My father taught me every old thing by feel, in the dark, before he let me look at it.",
  },
  {
    slug: "kaia-lepik",
    firstName: "Kaia",
    lastName: "Lepik",
    place: "Tallinn",
    bio: "Inheritor by accident. Everything I keep was found rather than chosen.",
  },
  {
    slug: "toomas-vali",
    firstName: "Toomas",
    lastName: "Väli",
    place: "Narva",
    bio: "I let more go than I kept. What's left, I actually mean to keep.",
  },
  {
    slug: "juhan-kask",
    firstName: "Juhan",
    lastName: "Kask",
    place: "Pärnu",
    bio: "Nothing on my shelf arrived with a story attached. I gave it one.",
  },
  {
    slug: "dario-pini",
    firstName: "Dario",
    lastName: "Pini",
    place: "Trieste",
    bio: "Half of what's here belonged to somebody who left in a hurry.",
  },
  {
    slug: "priit-saar",
    firstName: "Priit",
    lastName: "Saar",
    place: "Tallinn",
    bio: "I don't throw things out. I've tried. It doesn't take.",
  },
  {
    slug: "elin-haas",
    firstName: "Elin",
    lastName: "Haas",
    place: "Viljandi",
    bio: "Four moves, and it all came with me every time.",
  },
];

// object.category must be a slug that already exists on the backend.
const OBJECTS = [
  {
    name: "A Worn Copy of Kalevipoeg",
    description: "A hardcover edition read to pieces by three generations.",
    category: "books",
    keeper: "elin-haas",
    shortStory: "My grandmother read two pages of it every night, whether we asked or not.",
    story:
      "My grandmother read two pages of it every night whether we asked or not, and fell asleep herself before I did more often than either of us admitted.\n\nThe spine gave out sometime in the nineties and she mended it with packing tape, which embarrassed my mother and never once embarrassed her. I have bought two newer editions since. I keep reading this one, tape and all, because the tape is also hers.",
  },
  {
    name: "A School Atlas with Borders Redrawn in Pencil",
    description: "Every border that moved after 1991, corrected by hand at the kitchen table.",
    category: "books",
    keeper: "juhan-kask",
    shortStory:
      "Every border that moved after 1991 got a new pencil line drawn over the old one, at our kitchen table.",
    story:
      "Every border that moved after 1991 got a new pencil line drawn over the old one, in my father's hand, at the kitchen table, while the radio said the names of places changing.\n\nHe never erased the old lines. He said a map that pretends nothing happened is worse than a map that is wrong. I still check it before I check my phone, out of habit more than need.",
  },
  {
    name: "A Grey Wool Coat",
    description: "Her mother's winter coat, re-lined twice, never resized.",
    category: "clothing",
    keeper: "kaia-lepik",
    shortStory: "I put it on one October out of curiosity and never really took it off again.",
    story:
      "It hung at the back of the wardrobe behind the coats anyone actually wore, and I put it on one October out of curiosity and never really took it off again.\n\nIt is two sizes too big and the lining has been redone twice by two different hands I never met. I have been told to get it taken in. I have not, because I like disappearing into something that was hers before it decided to be mine.",
  },
  {
    name: "A Thin Gold Wedding Band",
    description: "Worn smooth on the inside from fifty years of the same hand.",
    category: "jewellery",
    keeper: "marta-ilves",
    shortStory:
      "Worn thin on the inside from fifty-one years of the same hand turning it without thinking.",
    story:
      "It is worn thin on the inside, thinner than the outside, from fifty-one years of the same hand turning it without thinking.\n\nI do not wear it. I keep it in the same small box it has always lived in, and open the box maybe twice a year, and each time it takes me a moment to remember whose hand actually wore it thin.",
  },
  {
    name: "A Bundle of Letters Tied With String",
    description: "Re-tied so many times the string has gone soft as fabric.",
    category: "letters",
    keeper: "anna-rozite",
    shortStory: "Tied with the same string, re-tied so many times it's gone soft as fabric.",
    story:
      "They are tied with the same piece of string, re-tied so many times it has gone soft as fabric, and nobody in the family agrees on whose handwriting is on the outer one.\n\nI have read maybe a third of them. Some are in a hand I cannot place at all, from a person nobody living remembers, and I have decided I would rather not know than ask around and lose the not-knowing.",
  },
  {
    name: "A Photograph of a Wedding, 1962",
    description: "The print that survived a fallen frame and a cracked pane of glass.",
    category: "photographs",
    keeper: "toomas-vali",
    shortStory:
      "Everyone's looking the wrong way except our mother, who knew it would be the one that lasted.",
    story:
      "Everyone in it is looking slightly the wrong way except our mother, who is looking dead into the lens like she already knew it would be the one that lasted.\n\nI have the actual print. My sister has the memory of the day the frame fell and cracked the glass, which she tells better than I do, because she was the one holding it when it happened.",
  },
  {
    name: "A Photograph of a Wedding, 1962",
    description: "The print that survived a fallen frame and a cracked pane of glass.",
    category: "photographs",
    keeper: "kaia-lepik",
    shortStory:
      "I was the one holding it when the glass cracked, not him, whatever he tells people.",
    story:
      "I was the one holding it when the glass cracked, not him, whatever he tells people, and I have never once let him forget it.\n\nIt still has the crack in the corner, a thin line across the collar of a man who was, by every account, deeply unimportant to the day. We have never had it reframed. The crack is thirty years old now and outranks most of the people in the photograph.",
  },
  {
    name: "A Chipped Blue Teacup",
    description: "The last survivor of a set of six.",
    category: "tableware",
    keeper: "dario-pini",
    shortStory:
      "One chip, right where your lip lands if you're right-handed and don't think about it.",
    story:
      "One chip, on the inside of the rim, exactly where your lip lands if you're right-handed and don't think about it, which after enough cups nobody does.\n\nIt came from a set of six and is the only survivor. I have been offered a full replacement set more than once. I keep drinking from the chipped one, out of the six, like loyalty is a thing you can owe a cup.",
  },
  {
    name: "A Set of Nesting Bowls",
    description:
      "Five bowls in a green nobody has manufactured in decades. The smallest is missing.",
    category: "tableware",
    keeper: "priit-saar",
    shortStory:
      "Five bowls in a green nobody makes anymore. The smallest has been missing longer than I've been alive.",
    story:
      "Five bowls that stack into one shape on the shelf, in a green nobody has manufactured in decades, and the smallest one is missing, and has been missing longer than I've been alive.\n\nMy mother swears it will turn up. It has not turned up in forty years. We keep the other four stacked with the gap where it should sit, which is somehow worse and better than replacing it would be.",
  },
  {
    name: "A Wooden Spinning Top",
    description: "Turned on a lathe in one evening, off-hand.",
    category: "toys",
    keeper: "juhan-kask",
    shortStory:
      "My father carved it on a lathe in one evening, off-hand, and it outlasted every toy we ever bought.",
    story:
      "My father carved it on a lathe in an evening, off-hand, the way other fathers might fix a fence, and it has outlasted every toy either of us ever bought.\n\nI gave it to a friend when his own father died and he had nothing to spin at the funeral reception, which is a strange thing to need but he needed it. He gave it back a year later without explaining why. I did not ask.",
  },
  {
    name: "A Wooden Spinning Top",
    description: "Turned on a lathe in one evening, off-hand.",
    category: "toys",
    keeper: "priit-saar",
    shortStory:
      "He put it in my hand at the worst possible moment and didn't say anything, which was exactly right.",
    story:
      "He put it in my hand at the worst possible moment and did not say anything, which was exactly right, because there was nothing to say and a top does not require conversation, only a flat surface and a wrist.\n\nI kept it a year. I am still not sure why I gave it back instead of buying my own. Some things are only the right weight in a hand if somebody else trusted you with them first.",
  },
  {
    name: "A Cracked-Face Pocket Watch",
    description: "The crack runs corner to corner across the eight.",
    category: "watches",
    keeper: "elin-haas",
    shortStory:
      "The crack runs corner to corner across the eight, which caused one genuinely alarming missed train in 1987.",
    story:
      "The crack runs corner to corner across the eight, so from certain angles it reads as a five, which caused one genuinely alarming missed train in 1987.\n\nIt has not kept accurate time since before I owned it. I wind it anyway, every few months, for the sound, which is the only thing about it that still works exactly as it should.",
  },
  {
    name: "A Cracked-Face Pocket Watch",
    description: "The crack runs corner to corner across the eight.",
    category: "watches",
    keeper: "marta-ilves",
    shortStory:
      "She let me hold it once, at her kitchen table, and told me the crack was older than its second owner.",
    story:
      "She let me hold it once, just once, at her kitchen table, and told me the crack was older than the watch's second owner, which did not make arithmetic sense and which I never once asked her to explain.\n\nI think about that kitchen table more than I think about the watch. The watch I only saw the one time. The not-explaining I have carried for thirty years.",
  },
];

const request = async (path, { method = "GET", token, body } = {}) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, data };
};

const registerAndLogin = async (keeper) => {
  const email = `${keeper.slug}@seed.reliqa.space`;

  const registered = await request("users/", {
    method: "POST",
    body: { email, password: SEED_PASSWORD },
  });
  if (registered.ok) {
    console.log(`  registered ${keeper.slug}`);
  } else {
    console.log(`  register skipped for ${keeper.slug} (${registered.status}) — assuming exists`);
  }

  const login = await request("tokens/", {
    method: "POST",
    body: { email, password: SEED_PASSWORD },
  });
  if (!login.ok) {
    throw new Error(`login failed for ${keeper.slug}: ${JSON.stringify(login.data)}`);
  }

  const token = login.data.access;

  const patched = await request("users/me/", {
    method: "PATCH",
    token,
    body: {
      username: keeper.slug,
      first_name: keeper.firstName,
      last_name: keeper.lastName,
      bio: keeper.bio,
      residence: keeper.place,
    },
  });
  if (!patched.ok) {
    console.log(`  profile patch failed for ${keeper.slug}: ${JSON.stringify(patched.data)}`);
  }

  return token;
};

const main = async () => {
  console.log("Registering keepers…");
  const tokens = {};
  for (const keeper of KEEPERS) {
    tokens[keeper.slug] = await registerAndLogin(keeper);
  }

  console.log("Creating objects…");
  for (const object of OBJECTS) {
    const created = await request("objects/", {
      method: "POST",
      token: tokens[object.keeper],
      body: {
        name: object.name,
        description: object.description,
        categories: [object.category],
        story: object.story,
        short_story: object.shortStory,
      },
    });
    if (!created.ok) {
      console.log(
        `  FAILED object "${object.name}" by ${object.keeper}: ${JSON.stringify(created.data)}`,
      );
      continue;
    }
    console.log(`  ${object.keeper}: ${object.name} -> ${created.data.id}`);
  }

  console.log("Done.");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
