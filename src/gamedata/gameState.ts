import { getTodaysPotCode } from "./dataBank.ts";
import { GameState } from "../../provincle/src/types/data.ts";

const defaultGameState: GameState = {
  potCode: getTodaysPotCode(),
  currentRound: 1,
  rounds: new Map(),
};

export default defaultGameState;
