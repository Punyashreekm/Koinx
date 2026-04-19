/**
 * After-harvesting card: start from Capital Gains API, then layer in each
 * selected holding's short/long gains (assignment rule).
 */
export function computeAfterHarvest(pre, selectedHoldings) {
  if (!pre) return null;

  let stProfits = pre.shortTerm.profits;
  let stLosses = pre.shortTerm.losses;
  let ltProfits = pre.longTerm.profits;
  let ltLosses = pre.longTerm.losses;

  for (const h of selectedHoldings) {
    const st = h.stcg.gain;
    const lt = h.ltcg.gain;
    if (st > 0) stProfits += st;
    else stLosses += Math.abs(st);
    if (lt > 0) ltProfits += lt;
    else ltLosses += Math.abs(lt);
  }

  const stNet = stProfits - stLosses;
  const ltNet = ltProfits - ltLosses;

  return {
    shortTerm: {
      profits: stProfits,
      losses: stLosses,
      netCapitalGains: stNet,
    },
    longTerm: {
      profits: ltProfits,
      losses: ltLosses,
      netCapitalGains: ltNet,
    },
    effectiveCapitalGains: stNet + ltNet,
  };
}
