export function SocialLinks() {
  return (
    <section id="social" className="py-12 md:py-20 lg:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-center mb-6 md:mb-8 text-[#1a1a1a]">
            Gdzie nas znaleźć
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {/* PGK w Hiszpanii */}
          <a href="https://www.pgkhiszpania.com/" target="_blank" rel="noopener noreferrer" className="btn">
            <svg className="sparkle" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
              <path d="M2 17L12 22L22 17"/>
              <path d="M2 12L12 17L22 12"/>
            </svg>
            <span className="text">PGK w Hiszpanii</span>
          </a>

          {/* Biznes w Hiszpanii */}
          <a href="https://www.bizneswhiszpanii.com/" target="_blank" rel="noopener noreferrer" className="btn">
            <svg className="sparkle" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8V16M8 12H16"/>
            </svg>
            <span className="text">Biznes w Hiszpanii</span>
          </a>

          {/* YouTube Button */}
          <a href="https://www.youtube.com/@BizneswHiszpanii" target="_blank" rel="noopener noreferrer" className="btn">
            <svg className="sparkle" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="text">YouTube</span>
          </a>

          {/* TikTok Button */}
          <a href="https://www.tiktok.com/@bizneswhiszpanii" target="_blank" rel="noopener noreferrer" className="btn">
            <svg className="sparkle" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
            <span className="text">TikTok</span>
          </a>

          {/* Rejestracja w Hiszpanii */}
          <a href="https://www.rejestracjahiszpania.com/" target="_blank" rel="noopener noreferrer" className="btn">
            <svg className="sparkle" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              <path d="M9 1v6h6"/>
            </svg>
            <span className="text">Rejestracja w Hiszpanii</span>
          </a>
        </div>
      </div>
    </section>
  );
}
