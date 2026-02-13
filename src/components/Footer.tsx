export default function Footer() {
  return (
    <footer className="py-8 bg-[#0a0a0a] border-t border-[#CCA054]/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-[#FAF9F6]/50 text-sm">
            &copy; {new Date().getFullYear()} ACMJL - Jenny Lorant. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
