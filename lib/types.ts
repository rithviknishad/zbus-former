export type Bus = number;

export const referenceBus: Bus = 0;

export type ReactanceBranch = {
  startBus: Bus;
  endBus: Bus;
  reactance: number;
};

export type ReactanceDiagram = {
  branches: ReactanceBranch[];
};

export type ZBus = number[][];

export type ZBusFormationStep = {
  description: string;
  branch: ReactanceBranch;
  substeps: {
    description: string;
    result: ZBus;
  }[];
};
