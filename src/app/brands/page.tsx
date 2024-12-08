

import Image from "next/image";

export default function Brands() {
  return (
    <div className="w-full bg-black py-4">
      <div className="grid grid-cols-3 md:grid-cols-5 gap-y-4 md:gap-y-6 items-center px-4 sm:px-6 md:px-10">
        {/* Logo 1 */}
        <div className="flex justify-center">
          <Image
            src={"/l1.png"}
            alt="Brand Logo 1"
            height={33}
            width={126}
            className="w-auto h-auto"
          />
        </div>
        {/* Logo 2 */}
        <div className="flex justify-center">
          <Image
            src={"/l2.png"}
            alt="Brand Logo 2"
            height={38}
            width={91}
            className="w-auto h-auto"
          />
        </div>
        {/* Logo 3 */}
        <div className="flex justify-center">
          <Image
            src={"/l3.png"}
            alt="Brand Logo 3"
            height={36}
            width={126}
            className="w-auto h-auto"
          />
        </div>
        {/* Logo 4 */}
        <div className="flex justify-center">
          <Image
            src={"/l4.png"}
            alt="Brand Logo 4"
            height={32}
            width={124}
            className="w-auto h-auto"
          />
        </div>
        {/* Logo 5 */}
        <div className="flex justify-center">
          <Image
            src={"/l5.png"}
            alt="Brand Logo 5"
            height={33}
            width={126}
            className="w-auto h-auto"
          />
        </div>
      </div>
    </div>
  );
}
