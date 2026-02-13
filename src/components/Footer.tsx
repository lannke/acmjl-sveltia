export default function Footer() {
  return (
    <footer className="py-8 bg-[#0a0a0a] border-t border-[#CCA054]/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#FAF9F6]/50 text-sm">
            &copy; {new Date().getFullYear()} ACMJL - Jenny Lorant. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[#FAF9F6]/30 text-xs">Design</span>
            <span className="text-[#CCA054] text-xs">Broadway Theme</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
