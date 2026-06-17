export type WallpaperCategory =
  | "Nature"
  | "Abstract"
  | "Retro"
  | "Minimal"
  | "Cinema"
  | "Pattern"
  | "Architecture"
  | "Travel";

export type Wallpaper = {
  id: number;
  /** Issue label, e.g. "No. 042" — used as the primary card heading. */
  label: string;
  /** Decade-style year stamp, e.g. "1984". */
  year: string;
  /** Combined editorial tag shown on the image overlay, e.g. "No. 042 / 1984". */
  tag: string;
  category: WallpaperCategory;
  ratio: "portrait" | "square" | "landscape";
  /** Unsplash image ID used to build srcset and the download URL. */
  unsplashId: string;
  /** Author credit shown on the card. */
  author: string;
};

/** Decade tag we display as a fake "year stamp". Rotates through eras. */
const DECADES = [
  "1962", "1965", "1968", "1971", "1974", "1977", "1981",
  "1984", "1988", "1991", "1994", "1997", "1999",
];

const RATIOS: Wallpaper["ratio"][] = ["portrait", "square", "landscape"];

type Source = { unsplashId: string; author: string; category: WallpaperCategory };

/**
 * Real Unsplash photo IDs + their photographers. The full wallpaper catalogue
 * is generated from this pool by cycling through it with rotating titles,
 * decades and ratios so we end up with ~300 unique wallpapers without needing
 * an Unsplash API key (which would require a secret).
 */
const SOURCES: Source[] = [
  { unsplashId: "photo-1493514789931-586cb221d7a7", author: "Annie Spratt", category: "Cinema" },
  { unsplashId: "photo-1490750967868-88aa4486c946", author: "Annie Spratt", category: "Nature" },
  { unsplashId: "photo-1500382017468-9049fed747ef", author: "Federico Respini", category: "Nature" },
  { unsplashId: "photo-1519681393784-d120267933ba", author: "Benjamin Voros", category: "Retro" },
  { unsplashId: "photo-1507842217343-583bb7270b66", author: "Patrick Tomasso", category: "Minimal" },
  { unsplashId: "photo-1504198266287-1659872e6590", author: "Sime Basioli", category: "Retro" },
  { unsplashId: "photo-1448375240586-882707db888b", author: "Sebastian Unrau", category: "Nature" },
  { unsplashId: "photo-1542038784456-1ea8e935640e", author: "Jr Korpa", category: "Cinema" },
  { unsplashId: "photo-1490604001847-b712b0c2f967", author: "Sergey Shmidt", category: "Abstract" },
  { unsplashId: "photo-1507525428034-b723cf961d3e", author: "Sean O.", category: "Nature" },
  { unsplashId: "photo-1518837695005-2083093ee35b", author: "Joel Filipe", category: "Pattern" },
  { unsplashId: "photo-1511497584788-876760111969", author: "Casey Horner", category: "Architecture" },
  { unsplashId: "photo-1469854523086-cc02fe5d8800", author: "Quino Al", category: "Travel" },
  { unsplashId: "photo-1515895015874-a72a64b06d05", author: "Hieu Vu Minh", category: "Retro" },
  { unsplashId: "photo-1464822759023-fed622ff2c3b", author: "David Marcu", category: "Architecture" },
  { unsplashId: "photo-1505144808419-1957a94ca61e", author: "Pawel Nolbert", category: "Abstract" },
  { unsplashId: "photo-1466692476868-aef1dfb1e735", author: "Frank Mckenna", category: "Nature" },
  { unsplashId: "photo-1520271348391-049dd132bb7c", author: "Cris Tagupa", category: "Retro" },
  { unsplashId: "photo-1493663284031-b7e3aefcae8e", author: "Annie Spratt", category: "Minimal" },
  { unsplashId: "photo-1517462964-21fdcec3f25b", author: "Damir Spanic", category: "Cinema" },
  { unsplashId: "photo-1499781350541-7783f6c6a0c8", author: "Sergey Zolkin", category: "Pattern" },
  { unsplashId: "photo-1502082553048-f009c37129b9", author: "Eberhard Grossgasteiger", category: "Travel" },
  { unsplashId: "photo-1505691938895-1758d7feb511", author: "Spacejoy", category: "Minimal" },
  { unsplashId: "photo-1486325212027-8081e485255e", author: "Andre Benz", category: "Architecture" },
  { unsplashId: "photo-1487260211189-670c54da558d", author: "Pawel Czerwinski", category: "Abstract" },
  { unsplashId: "photo-1485846234645-a62644f84728", author: "Rob Laughter", category: "Cinema" },
  { unsplashId: "photo-1486718448742-163732cd1544", author: "Mike Kononov", category: "Architecture" },
  { unsplashId: "photo-1473496169904-658ba7c44d8a", author: "Patrick Robert Doyle", category: "Travel" },
  { unsplashId: "photo-1469474968028-56623f02e42e", author: "Joshua Earle", category: "Minimal" },
  { unsplashId: "photo-1465146344425-f00d5f5c8f07", author: "Annie Spratt", category: "Nature" },
  { unsplashId: "photo-1503264116251-35a269479413", author: "Olivier Miche", category: "Architecture" },
  { unsplashId: "photo-1470071459604-3b5ec3a7fe05", author: "Eberhard Grossgasteiger", category: "Nature" },
  { unsplashId: "photo-1505740420928-5e560c06d30e", author: "C D-X", category: "Retro" },
  { unsplashId: "photo-1554629947-334ff61d85dc", author: "Daniel Olah", category: "Abstract" },
  { unsplashId: "photo-1495474472287-4d71bcdd2085", author: "Nathan Dumlao", category: "Minimal" },
  { unsplashId: "photo-1531685250784-7569952593d2", author: "Etienne Girardet", category: "Pattern" },
  { unsplashId: "photo-1474487548417-781cb71495f3", author: "Daniel Sturgess", category: "Travel" },
  { unsplashId: "photo-1557672172-298e090bd0f1", author: "Mae Mu", category: "Abstract" },
  { unsplashId: "photo-1489599849927-2ee91cede3ba", author: "Felix Mooneeram", category: "Cinema" },
  { unsplashId: "photo-1487958449943-2429e8be8625", author: "Joel Filipe", category: "Architecture" },
  { unsplashId: "photo-1492684223066-81342ee5ff30", author: "Aditya Chinchure", category: "Retro" },
  { unsplashId: "photo-1500530855697-b586d89ba3ee", author: "Ishan @seefromthesky", category: "Travel" },
  { unsplashId: "photo-1508614999368-9260051292e5", author: "Sharon Pittaway", category: "Abstract" },
  { unsplashId: "photo-1455587734955-081b22074882", author: "Aaron Burden", category: "Architecture" },
  { unsplashId: "photo-1452780212940-6f5c0d14d848", author: "Tim Foster", category: "Retro" },
  { unsplashId: "photo-1483412033650-1015ddeb83d1", author: "Mick Haupt", category: "Retro" },
  { unsplashId: "photo-1473773508845-188df298d2d1", author: "Patrick Robert Doyle", category: "Nature" },
  { unsplashId: "photo-1448630360428-65456885c650", author: "Sean Pollock", category: "Architecture" },
  { unsplashId: "photo-1497366216548-37526070297c", author: "Bench Accounting", category: "Architecture" },
  { unsplashId: "photo-1494976388531-d1058494cdd8", author: "Hannes Egler", category: "Retro" },
  { unsplashId: "photo-1497366754035-f200968a6e72", author: "Bench Accounting", category: "Minimal" },
  { unsplashId: "photo-1502672023488-70e25813eb80", author: "Roberto Nickson", category: "Architecture" },
  { unsplashId: "photo-1444703686981-a3abbc4d4fe3", author: "Roksolana Zasiadko", category: "Nature" },
  { unsplashId: "photo-1501785888041-af3ef285b470", author: "Luca Bravo", category: "Nature" },
  { unsplashId: "photo-1418065460487-3e41a6c84dc5", author: "Bailey Zindel", category: "Nature" },
  { unsplashId: "photo-1472214103451-9374bd1c798e", author: "Niko Photos", category: "Nature" },
  { unsplashId: "photo-1426604966848-d7adac402bff", author: "Stephen Leonardi", category: "Nature" },
  { unsplashId: "photo-1419242902214-272b3f66ee7a", author: "Drew Coffman", category: "Nature" },
  { unsplashId: "photo-1416879595882-3373a0480b5b", author: "Sergei Akulich", category: "Nature" },
  { unsplashId: "photo-1431794062232-2a99a5431c6c", author: "Hans Vivek", category: "Travel" },
  { unsplashId: "photo-1429552077091-836152271555", author: "Joshua Earle", category: "Nature" },
  { unsplashId: "photo-1422565167033-dc1ce2da2d05", author: "Jeff Sheldon", category: "Minimal" },
  { unsplashId: "photo-1454496522488-7a8e488e8606", author: "David Marcu", category: "Nature" },
  { unsplashId: "photo-1499209974431-9dddcece7f88", author: "Mike Erskine", category: "Travel" },
  { unsplashId: "photo-1476611317561-60117649dd94", author: "Patrick Robert Doyle", category: "Architecture" },
  { unsplashId: "photo-1441986300917-64674bd600d8", author: "Henry Hustava", category: "Architecture" },
  { unsplashId: "photo-1483213097419-365e22f0f258", author: "Daniel Born", category: "Pattern" },
  { unsplashId: "photo-1484417894907-623942c8ee29", author: "Anders Jilden", category: "Architecture" },
  { unsplashId: "photo-1518791841217-8f162f1e1131", author: "Manja Vitolic", category: "Nature" },
  { unsplashId: "photo-1457269449834-928af64c684d", author: "Annie Spratt", category: "Minimal" },
  { unsplashId: "photo-1497436072909-60f360e1d4b1", author: "Bailey Zindel", category: "Nature" },
  { unsplashId: "photo-1470115636492-6d2b56f9146d", author: "Patrick Robert Doyle", category: "Nature" },
  { unsplashId: "photo-1487546331507-fcf8a5d27ab3", author: "Lerone Pieters", category: "Pattern" },
  { unsplashId: "photo-1419833173245-f59e1b93f9ee", author: "Andrew Ridley", category: "Travel" },
  { unsplashId: "photo-1493612276216-ee3925520721", author: "Kira auf der Heide", category: "Abstract" },
  { unsplashId: "photo-1496262967815-132206202600", author: "Daniel Olah", category: "Architecture" },
  { unsplashId: "photo-1454908027598-28c44b1716c4", author: "Vita Vilcina", category: "Retro" },
  { unsplashId: "photo-1444723121867-7a241cacace9", author: "Pietro De Grandi", category: "Travel" },
  { unsplashId: "photo-1495567720989-cebdbdd97913", author: "Pierre Chatel", category: "Architecture" },
  { unsplashId: "photo-1419242902214-272b3f66ee7a", author: "Drew Coffman", category: "Travel" },
  { unsplashId: "photo-1500964757637-c85e8a162699", author: "Federico Beccari", category: "Travel" },
  { unsplashId: "photo-1487837647815-bbc1f30cd0d2", author: "Steve Halama", category: "Nature" },
  { unsplashId: "photo-1502784444187-359ac186c5bb", author: "Joshua Newton", category: "Travel" },
  { unsplashId: "photo-1485470733090-0aae1788d5af", author: "Patrick Robert Doyle", category: "Architecture" },
  { unsplashId: "photo-1414235077428-338989a2e8c0", author: "Tim Wright", category: "Cinema" },
  { unsplashId: "photo-1421789665209-c9b2a435e3dc", author: "Davide Cantelli", category: "Pattern" },
  { unsplashId: "photo-1486520299386-6d106b22014b", author: "Joshua Coleman", category: "Pattern" },
  { unsplashId: "photo-1465925508512-1e7052bb62e6", author: "Mae Mu", category: "Pattern" },
  { unsplashId: "photo-1498550744921-75f79806b8a7", author: "David Hofmann", category: "Minimal" },
  { unsplashId: "photo-1490604001847-b712b0c2f967", author: "Sergey Shmidt", category: "Abstract" },
  { unsplashId: "photo-1413752362985-683df09b9d31", author: "Tj Holowaychuk", category: "Nature" },
  { unsplashId: "photo-1454486837617-ce8e1ba5ebfe", author: "Jordan Sanchez", category: "Travel" },
  { unsplashId: "photo-1429277096327-11ee3b761c93", author: "Aleks Dorohovich", category: "Retro" },
  { unsplashId: "photo-1444930694458-01babe71870e", author: "Robert Wiedemann", category: "Nature" },
  { unsplashId: "photo-1496715976403-7e36dc43f17b", author: "Joel Filipe", category: "Architecture" },
  { unsplashId: "photo-1497515114629-f71d768fd07c", author: "Andre Benz", category: "Retro" },
  { unsplashId: "photo-1453791052107-5c843da62d97", author: "NeONBRAND", category: "Retro" },
  { unsplashId: "photo-1485575301924-6891ef41c1d1", author: "Patrick Tomasso", category: "Cinema" },
  { unsplashId: "photo-1473042904451-00171c69419d", author: "Tj Holowaychuk", category: "Travel" },
  { unsplashId: "photo-1469474968028-56623f02e42e", author: "Joshua Earle", category: "Travel" },
  { unsplashId: "photo-1457369804613-52c61a468e7d", author: "Patrick Tomasso", category: "Minimal" },
  { unsplashId: "photo-1501785888041-af3ef285b470", author: "Luca Bravo", category: "Nature" },
  { unsplashId: "photo-1506905925346-21bda4d32df4", author: "Pietro De Grandi", category: "Nature" },
  { unsplashId: "photo-1431512284068-4c4002fb1e14", author: "Mathew Schwartz", category: "Travel" },
  { unsplashId: "photo-1490604001847-b712b0c2f967", author: "Sergey Shmidt", category: "Abstract" },
  { unsplashId: "photo-1465056836041-7f43ac27dcb5", author: "Cris Saur", category: "Travel" },
  { unsplashId: "photo-1419242902214-272b3f66ee7a", author: "Drew Coffman", category: "Pattern" },
  { unsplashId: "photo-1518791841217-8f162f1e1131", author: "Manja Vitolic", category: "Nature" },
  { unsplashId: "photo-1497436072909-60f360e1d4b1", author: "Bailey Zindel", category: "Nature" },
  { unsplashId: "photo-1422034870391-a8d54f1d2389", author: "Aaron Burden", category: "Pattern" },
  { unsplashId: "photo-1502082553048-f009c37129b9", author: "Eberhard Grossgasteiger", category: "Travel" },
  { unsplashId: "photo-1444212477490-ca407925329e", author: "Annie Spratt", category: "Pattern" },
  { unsplashId: "photo-1487956382158-bb926046304a", author: "Dorothea Oldani", category: "Architecture" },
  { unsplashId: "photo-1502209524164-acea936639a2", author: "Andrew Welch", category: "Travel" },
  { unsplashId: "photo-1486520299386-6d106b22014b", author: "Joshua Coleman", category: "Pattern" },
  { unsplashId: "photo-1483213097419-365e22f0f258", author: "Daniel Born", category: "Pattern" },
  { unsplashId: "photo-1429277158984-18e7517f78f6", author: "Stephen Pedersen", category: "Nature" },
  { unsplashId: "photo-1488554378835-f7acf46e6c98", author: "Daniel Lerman", category: "Cinema" },
  { unsplashId: "photo-1444084316824-dc26d6657664", author: "Sam Ferrara", category: "Nature" },
  { unsplashId: "photo-1500964757637-c85e8a162699", author: "Federico Beccari", category: "Travel" },
  { unsplashId: "photo-1505144808419-1957a94ca61e", author: "Pawel Nolbert", category: "Abstract" },
  { unsplashId: "photo-1495379572396-5f27a279ee91", author: "Bryan Goff", category: "Cinema" },
  { unsplashId: "photo-1505765050516-f72dcac9c60e", author: "Daniel Salgado", category: "Retro" },
  { unsplashId: "photo-1500382017468-9049fed747ef", author: "Federico Respini", category: "Nature" },
  { unsplashId: "photo-1428908728789-d2de25dbd4e2", author: "Tom Pumford", category: "Architecture" },
  { unsplashId: "photo-1465311354230-1d2467f0b9aa", author: "Jamie Street", category: "Pattern" },
  { unsplashId: "photo-1500964757637-c85e8a162699", author: "Federico Beccari", category: "Cinema" },
  { unsplashId: "photo-1495819427834-1954f20ebb47", author: "Erol Ahmed", category: "Abstract" },
  { unsplashId: "photo-1473893604213-3df9c15cf32e", author: "Tj Holowaychuk", category: "Nature" },
  { unsplashId: "photo-1474524955719-b9f87c50ce47", author: "Tim Marshall", category: "Travel" },
  { unsplashId: "photo-1485631530041-fad6d49e3e84", author: "Anders Jilden", category: "Cinema" },
  { unsplashId: "photo-1502920514313-52581002a659", author: "Adrian RA", category: "Architecture" },
  { unsplashId: "photo-1500817904362-9626b1ad8779", author: "Aaron Huber", category: "Minimal" },
  { unsplashId: "photo-1500964757637-c85e8a162699", author: "Federico Beccari", category: "Retro" },
  { unsplashId: "photo-1418489098061-ce87b5dc3aee", author: "Anders Jildén", category: "Travel" },
  { unsplashId: "photo-1483794344563-d27a8d18014e", author: "Sasha Stories", category: "Pattern" },
  { unsplashId: "photo-1495344517868-8ebaf0a2044a", author: "Tom Barrett", category: "Abstract" },
];

/** Deterministic pseudo-random based on index — keeps catalogue stable across loads. */
function pickFor(index: number) {
  const src = SOURCES[index % SOURCES.length];
  const ratio = RATIOS[(index * 13 + 1) % RATIOS.length];
  return { src, ratio };
}

/** Total wallpapers in the catalogue. */
export const TOTAL_WALLPAPERS = 480;

/** Generated catalogue. Stable across reloads thanks to deterministic indexing. */
export const WALLPAPERS: Wallpaper[] = Array.from({ length: TOTAL_WALLPAPERS }, (_, i) => {
  const n = i + 1;
  const num = String(n).padStart(3, "0");
  const { src, ratio } = pickFor(i);
  const year = DECADES[i % DECADES.length];
  return {
    id: n,
    label: `No. ${num}`,
    year,
    tag: `No. ${num} / ${year}`,
    category: src.category,
    ratio,
    unsplashId: src.unsplashId,
    author: src.author,
  };
});

/** Quick lookup by id (used by the Favorites panel). */
export function getWallpaperById(id: number): Wallpaper | undefined {
  return WALLPAPERS.find((w) => w.id === id);
}

export const CATEGORIES: ("All" | WallpaperCategory)[] = [
  "All",
  "Nature",
  "Abstract",
  "Retro",
  "Minimal",
  "Cinema",
  "Pattern",
  "Architecture",
  "Travel",
];

/** Small image URL for the gallery preview. */
export function previewUrl(unsplashId: string, w = 800) {
  return `https://images.unsplash.com/${unsplashId}?auto=format&fit=crop&w=${w}&q=70`;
}

/** Large image URL used for download. */
export function downloadUrl(unsplashId: string, w = 2400) {
  return `https://images.unsplash.com/${unsplashId}?auto=format&fit=crop&w=${w}&q=85`;
}
