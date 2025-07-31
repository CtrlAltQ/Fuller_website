import Image from 'next/image'
import { businessInfo } from '@/data/businessInfo'
import ProjectSlider from '@/components/ui/ProjectSlider'
import { getImagePath } from '@/utils/imagePaths'
import { formatPhoneForCall, formatPhoneForDisplay } from '@/utils/seo'

export default function Hero() {
  return (
    <section className="bg-black text-white min-h-screen flex items-center">
      <div className="container-custom px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh] py-8 lg:py-0">
          {/* Left Column - Fuller Logo and About/Contact */}
          <div className="flex flex-col items-center justify-center text-center order-1 lg:order-1">
            {/* Fuller Logo */}
            <div className="mb-6 lg:mb-8">
              <Image
                src={getImagePath("images/logos/Fuller_Logo.jpg")}
                alt="Fuller Restoration and Renovation LLC Logo"
                width={250}
                height={250}
                className="rounded-lg w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 object-cover"
                priority
                sizes="(max-width: 640px) 192px, (max-width: 1024px) 240px, 288px"
              />
            </div>
            
            {/* About and Contact Text */}
            <div className="text-white max-w-2xl">
              <div className="mb-6">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-yellow-400 leading-tight">
                  {businessInfo.name}
                </h1>
                <p className="text-base sm:text-lg md:text-xl mb-3 sm:mb-4 leading-relaxed">
                  <span className="font-semibold text-yellow-300">Family-owned and operated</span> with over <span className="font-semibold text-yellow-300">15+ years of experience</span> in home renovations and restorations throughout Middle Tennessee.
                </p>
                <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 leading-relaxed">
                  We specialize in <span className="font-medium">flooring, custom trim work, windows, cabinets & countertops, fences, decks, and porches</span> - delivering quality craftsmanship and personalized service to every project.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed hidden sm:block">
                  From small repairs to complete home transformations, we bring your vision to life with the expertise and attention to detail that comes from years of dedicated service to our community.
                </p>
              </div>
              
              {/* Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <a
                  href={`tel:${formatPhoneForCall(businessInfo.phone)}`}
                  className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 touch-manipulation w-full sm:w-auto text-center text-base sm:text-lg"
                >
                  Call {formatPhoneForDisplay(businessInfo.phone)}
                </a>
                <a
                  href="/contact"
                  className="bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 touch-manipulation w-full sm:w-auto text-center text-base sm:text-lg"
                >
                  Free Estimate
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Slider Area */}
          <div className="flex items-center justify-center order-2 lg:order-2">
            <div className="w-full max-w-lg lg:max-w-none">
              <ProjectSlider />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}