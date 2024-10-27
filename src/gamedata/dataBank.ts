import { PotCode, PotData, DataBank } from "../../provincle/src/types/data.ts";
import {
  MyGeoMapping,
  sanitizeString,
  // getTodaysCodeIndex,
  directionEmojiMap,
  defaultTFunction,
} from "../../provincle/src/utils/utils.ts";
import {
  calculateAngle,
  angle15ToDir,
  //calculateDistanceInKm,
} from "../../provincle/src/utils/geo.ts";

//import i18n from "./i18n.ts";

// data sources
// - https://mapsvg.com/maps/hungary

export type VarmegyeCode =
  | "ba"
  | "be"
  | "bk"
  | "bu"
  | "bz"
  | "cs"
  | "fe"
  | "gs"
  | "hb"
  | "he"
  | "jn"
  | "ke"
  | "no"
  | "pe"
  | "sb"
  | "so"
  | "to"
  | "va"
  | "ve"
  | "za";
const listOfVarmegyeCodes: VarmegyeCode[] = [
  "ba",
  "be",
  "bk",
  "bu",
  "bz",
  "cs",
  "fe",
  "gs",
  "hb",
  "he",
  "jn",
  "ke",
  "no",
  "pe",
  "so",
  "sb",
  "to",
  "va",
  "ve",
  "za",
];

const dataBankData: Record<VarmegyeCode, PotData> = {
  ba: {
    capital: "capital-ba",
    neighbors: ["so", "to", "bk"],
    coordinates: { latitude: 46.022909, longitude: 18.190504 },
    population: 15996989,
    largestCities: [{ key: "city_lovas", population: 0 }],
    interestingFacts: [],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
    majorLeagueTeams: ["aa"],
  },
  be: {
    capital: "capital-be",
    neighbors: ["cs", "jn", "hb"],
    coordinates: { latitude: 46.733189, longitude: 21.01164 },
    population: 15996989,
    largestCities: [{ key: "city_lovas", population: 0 }],
    interestingFacts: [],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
    majorLeagueTeams: ["bb"],
  },
  bk: {
    capital: "capital-bk",
    neighbors: ["ba", "to", "fe", "pe", "jn", "cs"],
    coordinates: { latitude: 46.637382, longitude: 19.460698 },
    population: 15996989,
    largestCities: [{ key: "city_lovas", population: 0 }],
    interestingFacts: [],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
    majorLeagueTeams: ["cc"],
  },
  bu: {
    capital: "capital-bu",
    neighbors: ["pe"],
    coordinates: { latitude: 47.478964, longitude: 19.126102 },
    population: 15996989,
    largestCities: [{ key: "city_lovas", population: 0 }],
    interestingFacts: [],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
    majorLeagueTeams: ["dd"],
  },
  bz: {
    capital: "capital-bz",
    neighbors: ["no", "he", "jn", "hb", "sb"],
    coordinates: { latitude: 48.220652, longitude: 20.976244 },
    population: 15996989,
    largestCities: [{ key: "city_lovas", population: 0 }],
    interestingFacts: [],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
    majorLeagueTeams: ["ee"],
  },
  cs: {
    capital: "capital-cs",
    neighbors: ["bk", "jn", "be"],
    coordinates: { latitude: 46.453168, longitude: 20.233688 },
    population: 15996989,
    largestCities: [{ key: "city_lovas", population: 0 }],
    interestingFacts: [],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
    majorLeagueTeams: ["ff"],
  },
  fe: {
    capital: "capital-fe",
    neighbors: ["pe", "ke", "ve", "so", "to", "bk"],
    coordinates: { latitude: 47.140147, longitude: 18.540537 },
    population: 15996989,
    largestCities: [{ key: "city_lovas", population: 0 }],
    interestingFacts: [],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
    majorLeagueTeams: ["gg"],
  },
  gs: {
    capital: "capital-gs",
    neighbors: ["ke", "ve", "va"],
    coordinates: { latitude: 47.658181, longitude: 17.448908 },
    population: 15996989,
    largestCities: [{ key: "city_lovas", population: 0 }],
    interestingFacts: [],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
    majorLeagueTeams: ["hh"],
  },
  hb: {
    capital: "capital-hb",
    neighbors: ["be", "jn", "bz", "sb"],
    coordinates: { latitude: 47.479596, longitude: 21.54744 },
    population: 15996989,
    largestCities: [{ key: "city_lovas", population: 0 }],
    interestingFacts: [],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
    majorLeagueTeams: ["ii"],
  },
  he: {
    capital: "capital-he",
    neighbors: ["no", "pe", "jn", "bz"],
    coordinates: { latitude: 47.804578, longitude: 20.227342 },
    population: 15996989,
    largestCities: [{ key: "city_lovas", population: 0 }],
    interestingFacts: [],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
    majorLeagueTeams: ["jj"],
  },
  jn: {
    capital: "capital-jn",
    neighbors: ["he", "bz", "hb", "be", "cs", "bk", "pe"],
    coordinates: { latitude: 47.221602, longitude: 20.481207 },
    population: 15996989,
    largestCities: [{ key: "city_lovas", population: 0 }],
    interestingFacts: [],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
    majorLeagueTeams: ["kk"],
  },
  ke: {
    capital: "capital-ke",
    neighbors: ["gs", "ve", "fe", "pe"],
    coordinates: { latitude: 47.622063, longitude: 18.3018 },
    population: 15996989,
    largestCities: [{ key: "city_lovas", population: 0 }],
    interestingFacts: [],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
    majorLeagueTeams: ["ll"],
  },
  no: {
    capital: "capital-no",
    neighbors: ["bz", "he", "bu"],
    coordinates: { latitude: 47.983197, longitude: 19.519957 },
    population: 15996989,
    largestCities: [{ key: "city_lovas", population: 0 }],
    interestingFacts: [],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
    majorLeagueTeams: ["mm"],
  },
  pe: {
    capital: "capital-pe",
    neighbors: ["bu", "ke", "fe", "bk", "jn", "he", "no"],
    coordinates: { latitude: 47.450066, longitude: 19.305458 },
    population: 15996989,
    largestCities: [{ key: "city_lovas", population: 0 }],
    interestingFacts: [],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
    majorLeagueTeams: ["kppk"],
  },
  so: {
    capital: "capital-so",
    neighbors: ["fe", "to", "ba", "za", "ve"],
    coordinates: { latitude: 46.466029, longitude: 17.603159 },
    population: 15996989,
    largestCities: [{ key: "city_lovas", population: 0 }],
    interestingFacts: [],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
    majorLeagueTeams: ["qq"],
  },
  sb: {
    capital: "capital-sb",
    neighbors: ["bz", "hb"],
    coordinates: { latitude: 47.999807, longitude: 22.148213 },
    population: 15996989,
    largestCities: [{ key: "city_lovas", population: 0 }],
    interestingFacts: [],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
    majorLeagueTeams: ["qq"],
  },
  to: {
    capital: "capital-to",
    neighbors: ["fe", "bk", "ba", "so"],
    coordinates: { latitude: 46.523209, longitude: 18.534604 },
    population: 15996989,
    largestCities: [{ key: "city_lovas", population: 0 }],
    interestingFacts: [],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
    majorLeagueTeams: ["rr"],
  },
  va: {
    capital: "capital-va",
    neighbors: ["gs", "ve", "za"],
    coordinates: { latitude: 47.152252, longitude: 16.760706 },
    population: 15996989,
    largestCities: [{ key: "city_lovas", population: 0 }],
    interestingFacts: [],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
    majorLeagueTeams: ["ss"],
  },
  ve: {
    capital: "capital-ve",
    neighbors: ["gs", "ke", "fe", "so", "za", "va"],
    coordinates: { latitude: 47.111891, longitude: 17.626891 },
    population: 15996989,
    largestCities: [{ key: "city_lovas", population: 0 }],
    interestingFacts: [],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
    majorLeagueTeams: ["rr"],
  },
  za: {
    capital: "capital-za",
    neighbors: ["va", "ve", "so"],
    coordinates: { latitude: 46.69031728684619, longitude: 16.8852945 },
    population: 15996989,
    largestCities: [{ key: "city_lovas", population: 0 }],
    interestingFacts: [],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
    majorLeagueTeams: ["zz"],
  },
};

export function getPotNamesByLang(tGeo: MyGeoMapping): string[] {
  return Object.keys(dataBank.data).map((code: string) => tGeo(code));
}

export function getPotNameByLang(
  potCode: VarmegyeCode,
  tGeo: MyGeoMapping
): string {
  return tGeo(potCode); // lovas: as PotCode
}

// export function getPotName(potCode: CountyCode): string {
//   return getPotNameByLang(potCode, i18n.language);
// }

export function getPotCodeByName(name: string, tGeo: MyGeoMapping): string {
  console.log(`e-getPotCode name:${name}`);
  //for (const [code] of Object.keys(dataBank)) {
  for (const code of listOfVarmegyeCodes) {
    if (name === tGeo(code)) {
      return code; // as PotCode;
    }
  }
  return "invalid";
}

// export function getListOfCapitals(): string[] {
//   return potCodes.map((pot: PotCode) => dataBank[pot].capital.en); // how to make it work for FR?
// }

// export function getCapitalsByLang(langCode: string): string[] {
//   if (!langCode.startsWith("en") && !langCode.startsWith("fr")) {
//     throw new Error("invalid language");
//   }
//   langCode = langCode.substring(0, 2);
//   return Object.values(dataBank).map(
//     (entry: PotData) => entry.capital[langCode as keyof MultiLangName]
//   );
// }

export const potCodes = Object.keys(dataBankData) as PotCode[];
// export const potNamesEn: string[] = getPotNamesByLang("en-ca");
// export const potNamesFr: string[] = getPotNamesByLang("fr-ca");

export function getCurrentDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `${year}-0${month}-0${day}`;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    // TODO: replace this ole for loop
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
}

export function getPseudoRandomNumber(): number {
  const dateString = getCurrentDateString();
  const hash = hashString(dateString);
  return Math.abs(hash);
}

export function getTodaysPotCodeIndex(): number {
  const dateString = getCurrentDateString();
  const hash = hashString(dateString);
  return Math.abs(hash) % potCodes.length;
}

export function getTodaysPotCode(): string {
  return potCodes[getTodaysPotCodeIndex()];
}

export function getPseudoRandomPotCode(n: number): string {
  const idx2 = (getTodaysPotCodeIndex() + n) % potCodes.length; // TODO: improve or delete
  return potCodes[idx2];
}

function isValidCode(currentGuess: string, tGeo: MyGeoMapping): boolean {
  if (!currentGuess) {
    return false;
  }

  const sanitized = sanitizeString(currentGuess);

  return (
    undefined !== sanitized &&
    "" !== sanitized &&
    getPotNamesByLang(tGeo).some(name => sanitizeString(name) === sanitized)
  );
}

export function getDirectionEmoji( // todo: CountyCode?
  fromGuess: PotCode,
  toSolution: PotCode
): string {
  if (fromGuess === toSolution) {
    return directionEmojiMap.get("*") as string;
  }
  const angle: number = calculateAngle(
    dataBankData[fromGuess as VarmegyeCode].coordinates,
    dataBankData[toSolution as VarmegyeCode].coordinates
  );
  // console.log(
  //   `.calculateAngle(${fromGuess}, ${toSolution})=>${angle}:${angle15ToDir(angle)}:${directionEmojiMap.get(angle15ToDir(angle))}`
  // );
  return directionEmojiMap.get(angle15ToDir(angle)) as string;
  // const direction: CardinalDirection = calculateDirection(
  //   fromGuess,
  //   toSolution
  // );
  // return directionEmojiMap.get(direction) as string;
}

export function getPotMapSvgUrl(potCode: VarmegyeCode): string {
  //return `./varmegyle/assets/HU-${potCode.toUpperCase()}.svg`;
  let ret = new URL(
    `../../assets/HU-${potCode.toUpperCase()}.svg`,
    import.meta.url
  ).href;
  console.log(`getPotMap(${potCode}) -> ${ret}`);
  return ret;
}
export function getPotFlagSvgUrl(potCode: PotCode): string {
  return new URL(
    `../../assets/HU-${potCode.toUpperCase()}-flag.svg`,
    import.meta.url
  ).href;
}

export function getCapitals(tGeo: MyGeoMapping): string[] {
  return Object.values(dataBank).map(
    (entry: PotData) => tGeo(entry.capital) // tGeo(`capital${code}`) ?
  );
}
export function getCities(tGeo: MyGeoMapping): string[] {
  const retVal = ["Miskolc", "Tapolca"]; // getLargestCities(tGeo);
  getCapitals(tGeo).forEach((cap: string) => {
    if (!retVal.includes(cap)) {
      retVal.push(cap);
    }
  });
  retVal.sort();

  return retVal;
}
function getGuessEmoji(): string {
  return "\u{1F1ED}\u{1F1FA}";
}

//export default dataBank;
export const dataBank: DataBank = {
  data: dataBankData,
  isValidCode: isValidCode,
  getPotCodeByName: getPotCodeByName,
  getPotNamesByLang: getPotNamesByLang,
  getPotMapSvgUrl: getPotMapSvgUrl, // warning: does not work as I'd expect
  getPotFlagSvgUrl: getPotFlagSvgUrl,
  getCities: getCities,

  //getDistanceWithUnitBySetting:getDistanceWithUnitBySetting,
  getDirectionEmoji: getDirectionEmoji,
  getGuessEmoji: getGuessEmoji,
  tLang: defaultTFunction, // warning: to be set in Game.tsx
  tGeo: defaultTFunction, // warning: to be set in Game.tsx
};
