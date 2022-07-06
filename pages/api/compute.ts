import type { NextApiRequest, NextApiResponse } from "next";

import { ZBus, ReactanceDiagram, ZBusFormationStep } from "../../lib/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ZBusFormationStep[]>
) {
  const diagram: ReactanceDiagram = JSON.parse(req.body);

  let n = 0; // The number of busses
  diagram.branches.forEach((r) => (n = Math.max(n, r.startBus, r.endBus)));

  const steps: ZBusFormationStep[] = [];
  let zbus: ZBus = [];
  const busses = new Set<number>();

  diagram.branches.forEach((branch) => {
    const _ = (bus: number) => (bus === 0 ? "GND" : `${bus}`);
    const [startBus, endBus] = [_(branch.startBus), _(branch.endBus)];

    const requiresKronsReductionStep =
      busses.has(branch.startBus) && busses.has(branch.endBus);

    busses.add(branch.startBus).add(branch.endBus);

    const n = zbus.length;

    const new_zbus = [...zbus.map((row) => [...row, 0]), Array(n + 1).fill(0)];

    const step: ZBusFormationStep = {
      branch,
      description: `Adding j${branch.reactance} between ${startBus} and ${endBus}`,
      substeps: [],
    };
    steps.push(step);
  });

  res.status(200).json([]);
}
