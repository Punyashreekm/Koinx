import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Info } from "lucide-react";

const NOTES = [
  "Tax-loss harvesting is currently not allowed under Indian tax regulations.",
  "Tax harvesting does not apply to derivatives or futures.",
  "Price data is fetched from Coingecko.",
  "Some countries do not have a short-term/long-term bifurcation (currently everything is calculated as long-term).",
  "Only realized losses are considered for harvesting; unrealized losses are not.",
];

const DisclaimerAccordion = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full rounded-lg border border-[#0052fe] bg-[#0d1117]"
    >
      <AccordionItem value="disclaimers" className="border-b-0 border-none px-4">
        <AccordionTrigger className="py-3 text-white hover:no-underline [&>svg]:text-[#0052fe]">
          <span className="flex items-center gap-2 text-sm font-semibold">
            <Info className="h-4 w-4 shrink-0 text-[#0052fe]" aria-hidden />
            Important Notes & Disclaimers
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc space-y-1.5 pl-5 text-xs text-neutral-400">
            {NOTES.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DisclaimerAccordion;
