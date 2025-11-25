import type { LucideIcon } from "lucide-react";

export type SimpleLink = {
  name: string;
  path: string;
  icon: LucideIcon;
};

export type SubLink = {
  name: string;
  path: string;
};

export type AccordionLink = {
  id: string;
  title: string;
  icon: LucideIcon;
  subLinks: SubLink[];
};

export type LinkType = SimpleLink | AccordionLink;
