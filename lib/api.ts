import {
  Bus,
  ReactanceBranch,
  ReactanceDiagram,
  referenceBus,
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

export const addBranchToExistingZBus = (
  branch: ReactanceBranch,
  initial: ZBus,
  newBus: boolean
) => {
  const k = initial.length;
  const n = k + 1;

  const { reactance, startBus, endBus } = branch;

  let zbus: ZBus = [...initial];

  let step: ZBusFormationStep = { branch, substeps: [], description: "" };

  if (startBus === referenceBus || endBus === referenceBus) {
    const description = `Adding j${reactance} between ${startBus} and ${endBus}`;
    step.description = description;

    for (let i = 0; i < k; ++i) zbus[i].push(0); // Z(i, k)
    zbus.push([]);
    for (let j = 0; j < k; ++j) zbus[k].push(0); // Z(k, j)
    zbus[k].push(reactance); // Zkk

    step.substeps.push({ description, result: [...zbus] });
  }

  if (!newBus) {
    const description = "Applying kron's reduction";
    zbus = kronsReduce(zbus);
    step.substeps.push({ description, result: [...zbus] });
  }

  return step;
};

export const computeZBus = (diagram: ReactanceDiagram) => {
  const steps: ZBusFormationStep[] = [];

  const bussesFound = new Set<Bus>();
  let zbus: ZBus = [];

  diagram.branches.forEach((branch) => {
    const hasNewBus =
      !bussesFound.has(branch.startBus) || !bussesFound.has(branch.endBus);

    bussesFound.add(branch.startBus);
    bussesFound.add(branch.endBus);

    steps.push(addBranchToExistingZBus(branch, zbus, hasNewBus));

    zbus = steps.slice(-1)[0].substeps.slice(-1)[0].result;
  });

  return steps;
};
