import { useState } from "react";
import { ChevronDown, ChevronUp, UserCog, Settings, Folder } from "lucide-react";

export default function AccordionMenu() {
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const accordionItems = [
    {
      id: "account",
      title: "Account",
      icon: UserCog,
      links: ["Profile", "Billing", "Security"],
    },
    {
      id: "settings",
      title: "Settings",
      icon: Settings,
      links: ["General", "Notifications", "Privacy"],
    },
    {
      id: "reports",
      title: "Reports",
      icon: Folder,
      links: ["Monthly", "Quarterly", "Annual"],
    },
  ];

  return (
    <ul className="space-y-2">
      {accordionItems.map(({ id, title, icon: Icon, links }) => (
        <li key={id}>
          <button
            onClick={() => toggleAccordion(id)}
            className="w-full text-start flex items-center gap-x-3.5 py-2 px-3 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Icon className="size-4" />
            {title}
            {openAccordions.includes(id) ? (
              <ChevronUp className="ms-auto size-4" />
            ) : (
              <ChevronDown className="ms-auto size-4" />
            )}
          </button>

          {openAccordions.includes(id) && (
            <ul className="ps-8 pt-1 space-y-1 transition-all duration-300">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
