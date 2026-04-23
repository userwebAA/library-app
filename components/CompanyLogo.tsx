import Image from 'next/image'

export default function CompanyLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32'
  }

  return (
    <div className={`${sizeClasses[size]} relative group`}>
      {/* Try to load the real logo, fallback to styled version */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7a4d3b] to-[#5d3a2b] rounded-lg shadow-lg overflow-hidden group-hover:shadow-xl transition-all duration-300">
        <Image
          src="/logo.jpg"
          alt="Librairie Logo"
          fill
          className="object-contain p-1"
          onError={(e) => {
            // Fallback to styled version if image fails to load
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            const parent = target.parentElement
            if (parent) {
              parent.innerHTML = `
                <div class="w-full h-full flex items-center justify-center">
                  <div class="text-white font-bold text-center">
                    <div class="text-xs">📚</div>
                    <div class="text-xs mt-1">LIBRAIRIE</div>
                  </div>
                </div>
              `
            }
          }}
        />
      </div>

      {/* Subtle border effect */}
      <div className="absolute inset-0 rounded-lg border-2 border-[#e8e1d9]/20"></div>
    </div>
  )
}
