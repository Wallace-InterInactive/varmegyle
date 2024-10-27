import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// preferably use title case, unless it is a sentence with punctuation
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    fallbackNS: "base",
    resources: {
      // we strive to use only one flavor of English on the UI, with that being
      // Canadian English - in the code, we stick to U.S. spelling if possible
      en: {
        base: {
          guessVerb: "Guess",
          guessNoun: "Guess",
          giveUp: "Give up",
          areYouSure: "Are you sure",
          nextRound: "Next Round",
          province: "vármegye",
          territory: "county",
          provinceOrTerritory: "Province or Territory",
          capitalCity: "Capital City",
          attempts: "Attempts",
          // game round instructions
          gamePotRoundInstruction: "Select the province", // TODO: we probably don't need this
          gameFlagRoundInstruction: "Select the flag",
          gameCapitalRoundInstruction: "What is the capital",
          gameNeighborRoundInstruction: "What are the neighbours",
          gamePotRoundFinaleStats: "Stats",
          // alerts
          unknownPot: "Unknown province ot territory!",
          unknownCity: "Unknown city!",
          alreadyGuessed: "Already Guessed!",
          guessedIt: "Spot on!",
          guessedItList: ["Spot on!", "Well done!", "Awesome!"],
          failedIt: "Sorry, you missed it!",
        },
        geo: {
          hu: "Hungary",
          ba: "Baranya",
          be: "Békés",
          bk: "Bács-Kiskun",
          bu: "Budapest",
          bz: "Borsod-Abaúj-Zemplén",
          cs: "Csongrád",
          fe: "Fejér",
          gs: "Győr-Moson-Sopron",
          hb: "Hajdú-Bihar",
          he: "Heves",
          jn: "Jász-Nagykun-Szolnok",
          ke: "Komárom-Esztergom",
          no: "Nógrád",
          pe: "Pest",
          so: "Somogy",
          sb: "Szabolcs-Szatmár-Bereg",
          to: "Tolna",
          va: "Vas",
          ve: "Veszprém",
          za: "Zala",
          capital_ba: "Pécs",
          capital_be: "Békéscsaba",
          capital_bk: "Kecskemét",
          capital_bu: "none",
          capital_bz: "Miskolc",
          capital_cs: "Szeged",
          capital_fw: "Székesfehérvár",
          capital_gs: "Győr",
          capital_hb: "Debrecen",
          capital_he: "Eger",
          capital_jn: "Szolnok",
          capital_kv: "Tatabánya",
          capital_no: "Salgótarján",
          capital_pe: "Budapest",
          capital_so: "Kaposvár",
          capital_sb: "Nyíregyháza",
          capital_to: "Szekszárd",
          capital_va: "Szombathely",
          capital_ve: "Veszprém",
          capital_za: "Zalaegerszeg",
        },
      },
      hu: {
        base: {
          guessVerb: "tipp",
          guessNoun: "tipp", // since there is no such word in French
          giveUp: "Felad",
          areYouSure: "Biztos?",
          nextRound: "Kérem a következőt",
          varmegye: "Vármegye",
          capitalCity: "főváros",
          attempts: "próba",
          // game round instructions
          gamePotRoundInstruction: "Devinez la province", // TODO: we probably don't need this
          gameFlagRoundInstruction: "Quel est le drapeau",
          gameCapitalRoundInstruction: "Quelle est la capitale",
          gameNeighborRoundInstruction: "Quelles sont les voisins",
          gamePotRoundFinaleStats: "Eredmény",
          // alerts
          unknownPot: "Province ou territoire inconnu!",
          unknownCity: "Ville inconnue!",
          alreadyGuessed: "Déjà deviné!",
          guessedIt: "Gratulálok!",
          guessedItList: ["Gratulálok", "Szuper", "Ez az!"],
          failedIt: "Sebaj, majd legközelebb",
        },
        geo: {
          hu: "Magyarország",
        },
      },
    },
  });

export default i18next;
