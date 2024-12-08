

import Image from "next/image";

export default function Style() {
  return (
    <div className="w-full bg-white p-6">
      {/* Main Container */}
      <div className="max-w-screen-xl mx-auto bg-[#F0F0F0] rounded-2xl p-8">
        <h1 className="text-center text-[32px] md:text-[48px] font-bold mb-8">
          BROWSE BY DRESS STYLES
        </h1>

        {/* Image Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {/* Image 1 */}
          <div className="relative w-[300px] h-[200px] md:w-[407px] md:h-[289px]">
            <Image
              src="/capture.png"
              alt="Casual"
              fill
              className="rounded-lg object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white font-semibold">
              <h1>Casual</h1>
            </div>
          </div>

          {/* Image 2 */}
          <div className="relative w-[300px] h-[200px] md:w-[407px] md:h-[289px]">
            <Image
              src="/formal.png"
              alt="Formal"
              fill
              className="rounded-lg object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white font-semibold">
              <h1>Formal</h1>
            </div>
          </div>

          {/* Image 3 */}
          <div className="relative w-[300px] h-[200px] md:w-[407px] md:h-[289px]">
            <Image
              src="/partys.png"
              alt="Party"
              fill
              className="rounded-lg object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white font-semibold">
              <h1>Party</h1>
            </div>
          </div>

          {/* Image 4 */}
          <div className="relative w-[300px] h-[200px] md:w-[407px] md:h-[289px]">
            <Image
              src="/gym.PNG"
              alt="Gym"
              fill
              className="rounded-lg object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white font-semibold">
              <h1>Gym</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
