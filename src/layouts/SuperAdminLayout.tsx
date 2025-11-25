import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./Header";

export default function SuperAdminLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // ✅ Memoized toggle function (prevents re-renders)
  const handleMenuToggle = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);


  // ✅ Close sidebar on outside click (only on mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        window.innerWidth < 1024
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Auto-close sidebar when route changes (on mobile)
  useEffect(() => {
    if (window.innerWidth < 1024) setIsOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex relative">
      <main className="w-full">
        <Header openMenu={isOpen} menuToggle={handleMenuToggle} />

        <div ref={sidebarRef}>
          <Sidebar isOpen={isOpen} />
        </div>

        <div className="lg:ps-64">
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gray-100">
            <Outlet />
          </div>
        </div>
      </main>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
