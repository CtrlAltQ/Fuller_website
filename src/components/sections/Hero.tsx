import Image from 'next/image'
import { businessInfo } from '@/data/businessInfo'
import ProjectSlider from '@/components/ui/ProjectSlider'
import { getImagePath } from '@/utils/imagePaths'

export default function Hero() {
  return (
    <section className="bg-black text-white min-h-screen flex items-center">
      <div className="container-custom px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Fuller Logo and About/Contact */}
          <div className="flex flex-col items-center justify-center text-center">
            {/* Fuller Logo */}
            <div className="mb-8">
              <Image
                src={getImagePath("images/logos/Fuller_Logo.jpg")}
                alt="Fuller Restoration and Renovation LLC Logo"
                width={300}
                height={300}
                className="rounded-lg"
                priority
              />
            </div>
            
            {/* About and Contact Text */}
            <div className="text-white">
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-400">
                  {businessInfo.name}
                </h1>
                <p className="text-lg md:text-xl mb-4 leading-relaxed">
                  <span className="font-semibold text-yellow-300">Family-owned and operated</span> with over <span className="font-semibold text-yellow-300">15+ years of experience</span> in home renovations and restorations throughout Middle Tennessee.
                </p>
                <p className="text-base md:text-lg mb-4 leading-relaxed">
                  We specialize in <span className="font-medium">flooring, custom trim work, windows, cabinets & countertops, fences, decks, and porches</span> - delivering quality craftsmanship and personalized service to every project.
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  From small repairs to complete home transformations, we bring your vision to life with the expertise and attention to detail that comes from years of dedicated service to our community.
                </p>
              </div>
              
              {/* Contact Button */}
              <div className="flex justify-center">
                <a
                  href="tel:(931) 446-9792"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Call (931) 446-9792
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Slider Area */}
          <div className="flex items-center justify-center">
            <ProjectSlider />
          </div>
        </div>
      </div>
    </section>
  )
}