import { PotCode, PotData, DataBank } from "../../provincle/src/types/data.ts";
import {
  MyGeoMapping,
  sanitizeString,
  // getTodaysCodeIndex,
  directionEmojiMap,
} from "../../provincle/src/utils/utils.ts";
import {
  calculateAngle,
  angle15ToDir,
  //calculateDistanceInKm,
} from "../../provincle/src/utils/geo.ts";

//import i18n from "./i18n.ts";

// data sources
// - https://mapsvg.com/maps/hungary

export type VarmegyeCode = "ba" | "be" | "bk" | "bu" | "bz" | "cs" | "fe" | "gs" | "hb" | "he"
                         | "jn" | "ke" | "no" | "pe" | "sb" | "so" | "to" | "va" | "ve" | "za";
const listOfVarmegyeCodes: VarmegyeCode[] = [
  "ba", "be", "bk", "bu", "bz", "cs", "fe", "gs", "hb", "he", 
  "jn", "ke", "no", "pe", "so", "sb", "to", "va", "ve", "za"
];

const dataBankData: Record<VarmegyeCode, PotData> = {
  ba: {
    capital: "capital-ba",
    neighbors: ["kerry", "waterford", "tipperary", "limerick" ],
    coordinates: { latitude: 46.022909, longitude: 18.190504 },
    population: 15996989,
    largestCities: [ { key: "city_lovas", population: 0 } ],
    interestingFacts: [ ],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
  },
  be: {
    capital: "capital-be",
    neighbors: ["kerry", "waterford", "tipperary", "limerick" ],
    coordinates: { latitude: 49.25, longitude: -84.5, },
    population: 15996989,
    largestCities: [ { key: "city_lovas", population: 0 } ],
    interestingFacts: [ ],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
  },
  bk: {
    capital: "capital-bk",
    neighbors: ["kerry", "waterford", "tipperary", "limerick" ],
    coordinates: { latitude: 49.25, longitude: -84.5, },
    population: 15996989,
    largestCities: [ { key: "city_lovas", population: 0 } ],
    interestingFacts: [ ],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
  },
  bu: {
    capital: "capital-bu",
    neighbors: ["kerry", "waterford", "tipperary", "limerick" ],
    coordinates: { latitude: 49.25, longitude: -84.5, },
    population: 15996989,
    largestCities: [ { key: "city_lovas", population: 0 } ],
    interestingFacts: [ ],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
  },
  bz: {
    capital: "capital-bz",
    neighbors: ["galway", "limerick", "tipperary"],
    coordinates: {  latitude: 49.25, longitude: -84.5, },
    population: 15996989,
    largestCities: [ { key: "city_lovas", population: 0 } ],
    interestingFacts: [ ],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
  },
  cs: {
    capital: "capital-cs",
    neighbors: ["kerry", "waterford", "tipperary", "limerick" ],
    coordinates: { latitude: 49.25, longitude: -84.5, },
    population: 15996989,
    largestCities: [ { key: "city_lovas", population: 0 } ],
    interestingFacts: [ ],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
  },
  fe: {
    capital: "capital-fe",
    neighbors: ["kerry", "waterford", "tipperary", "limerick" ],
    coordinates: { latitude: 47.140147, longitude: 18.540537, },
    population: 15996989,
    largestCities: [ { key: "city_lovas", population: 0 } ],
    interestingFacts: [ ],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
  },
  gs: {
    capital: "capital-gs",
    neighbors: ["kerry", "waterford", "tipperary", "limerick" ],
    coordinates: { latitude: 47.658181, longitude: 17.448908, },
    population: 15996989,
    largestCities: [ { key: "city_lovas", population: 0 } ],
    interestingFacts: [ ],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
  },
  hb: {
    capital: "capital-hb",
    neighbors: ["kerry", "waterford", "tipperary", "limerick" ],
    coordinates: { latitude: 49.25, longitude: -84.5, },
    population: 15996989,
    largestCities: [ { key: "city_lovas", population: 0 } ],
    interestingFacts: [ ],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
  },
  he: {
    capital: "capital-he",
    neighbors: ["kerry", "waterford", "tipperary", "limerick" ],
    coordinates: { latitude: 49.25, longitude: -84.5, },
    population: 15996989,
    largestCities: [ { key: "city_lovas", population: 0 } ],
    interestingFacts: [ ],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
  },
  jn: {
    capital: "capital-jn",
    neighbors: ["kerry", "waterford", "tipperary", "limerick" ],
    coordinates: { latitude: 49.25, longitude: -84.5, },
    population: 15996989,
    largestCities: [ { key: "city_lovas", population: 0 } ],
    interestingFacts: [ ],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
  },
  ke: {
    capital: "capital-ke",
    neighbors: ["cork", "limerick"],
    coordinates: {      latitude: 47.622063,longitude: 18.301800,},
    population: 15996989,
    largestCities: [ { key: "city_lovas", population: 0 } ],
    interestingFacts: [ ],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
  },
  no: {
    capital: "capital-no",
    neighbors: ["kerry", "waterford", "tipperary", "limerick" ],
    coordinates: { latitude: 49.25, longitude: -84.5, },
    population: 15996989,
    largestCities: [ { key: "city_lovas", population: 0 } ],
    interestingFacts: [ ],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
  },
  pe: {
    capital: "capital-pe",
    neighbors: ["kerry", "waterford", "tipperary", "limerick" ],
    coordinates: { latitude: 49.25, longitude: -84.5, },
    population: 15996989,
    largestCities: [ { key: "city_lovas", population: 0 } ],
    interestingFacts: [ ],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
  },
  so: {
    capital: "capital-so",
    neighbors: ["kerry", "waterford", "tipperary", "limerick" ],
    coordinates: { latitude: 46.466029, longitude: 17.603159, },
    population: 15996989,
    largestCities: [ { key: "city_lovas", population: 0 } ],
    interestingFacts: [ ],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
  },
  sb:  {
    capital: "capital-sb",
    neighbors: ["kerry", "waterford", "tipperary", "limerick" ],
    coordinates: { latitude: 49.25, longitude: -84.5, },
    population: 15996989,
    largestCities: [ { key: "city_lovas", population: 0 } ],
    interestingFacts: [ ],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
  },
  to:  {
    capital: "capital-to",
    neighbors: ["kerry", "waterford", "tipperary", "limerick" ],
    coordinates: { latitude: 46.523209, longitude: 18.534604, },
    population: 15996989,
    largestCities: [ { key: "city_lovas", population: 0 } ],
    interestingFacts: [ ],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
  },
  va:  {
    capital: "capital-va",
    neighbors: ["kerry", "waterford", "tipperary", "limerick" ],
    coordinates: { latitude: 47.152252, longitude: 16.760706 },
    population: 15996989,
    largestCities: [ { key: "city_lovas", population: 0 } ],
    interestingFacts: [ ],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
  },
  ve:  {
    capital: "capital-ve",
    neighbors: ["kerry", "waterford", "tipperary", "limerick" ],
    coordinates: { latitude: 47.111891, longitude: 17.626891, },
    population: 15996989,
    largestCities: [ { key: "city_lovas", population: 0 } ],
    interestingFacts: [ ],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
  },
  za:  {
    capital: "capital-za",
    neighbors: ["kerry", "waterford", "tipperary", "limerick" ],
    coordinates: { latitude: 46.69031728684619, longitude: 16.8852945, },
    population: 15996989,
    largestCities: [ { key: "city_lovas", population: 0 } ],
    interestingFacts: [ ],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
  },
};

export function getPotNamesByLang(tGeo: MyGeoMapping): string[] {
  return Object.keys(dataBank.data).map((code: string) => tGeo(code));
}

export function getPotNameByLang(potCode: VarmegyeCode, tGeo: MyGeoMapping): string {
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

//export default dataBank;
export const dataBank: DataBank = {
  data: dataBankData,
  isValidCode: isValidCode,
  getPotCodeByName: getPotCodeByName,
  getPotNamesByLang: getPotNamesByLang,
  //getDistanceWithUnitBySetting:getDistanceWithUnitBySetting,
  getDirectionEmoji:getDirectionEmoji,
};
