import { create } from "zustand";
import { combine } from "zustand/middleware";

// 타입 정의
export type SquareValueType = "X" | "O" | null;
export type BoardType = [
  SquareValueType,
  SquareValueType,
  SquareValueType,
  SquareValueType,
  SquareValueType,
  SquareValueType,
  SquareValueType,
  SquareValueType,
  SquareValueType
];
type SetHistoryFunction = (History: BoardType[]) => BoardType[];
type SetHistoryValue = BoardType[] | SetHistoryFunction;
type SetCurrentMoveFunction = (nextCurrentMove: number) => number;
type SetCurrentMoveValue = number | SetCurrentMoveFunction;

const useGameStore = create(
  combine(
    {
      history: [Array(9).fill(null)] as BoardType[],
      currentMove: 0,
    },
    (set) => {
      return {
        setHistory: (nextHistory: SetHistoryValue) => {
          set((state) => ({
            history:
              typeof nextHistory === "function"
                ? nextHistory(state.history)
                : nextHistory,
          }));
        },
        setCurrentMove: (nextCurrentMove: SetCurrentMoveValue) => {
          set((state) => ({
            currentMove:
              typeof nextCurrentMove === "function"
                ? nextCurrentMove(state.currentMove)
                : nextCurrentMove,
          }));
        },
      };
    }
  )
);

export default useGameStore;
