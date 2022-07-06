import {
  ReactanceBranch,
  ReactanceDiagram,
  ZBus,
  ZBusFormationStep,
} from "./types";

export const kronsReduce = (matrix: number[][]) => {
  const result: number[][] = [];

  const n = matrix.length - 1;
  const t = matrix[n][n];

  for (let i = 0; i < n; ++i) {
    result.push([]);
    for (let j = 0; j < n; ++j)
      result[i].push(matrix[i][j] - (matrix[i][n] * matrix[n][j]) / t);
  }

  return result;
};

// export const formZBus = (props: {
//   zbusInitial: ZBus;
//   branchToAdd: ReactanceBranch;
//   newBus: boolean;
// }) => {
//   const k = zbusInitial.length;
//   const n = k + 1;
// };

// export const computeZBus = (diagram: ReactanceDiagram) => {
//   const steps: ZBusFormationStep[] = [];

//   return steps;
// };
