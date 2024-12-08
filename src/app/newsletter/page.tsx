



import { TfiEmail } from "react-icons/tfi";

export default function NewsLetter() {
  return (
    <div className="bg-black rounded-2xl mx-3 lg:mx-20 my-10 p-6 lg:p-10 flex flex-col lg:flex-row items-center lg:justify-between space-y-6 lg:space-y-0">
      {/* Heading Section */}
      <h5 className="text-white text-2xl lg:text-4xl font-bold leading-tight lg:leading-[45px] text-center lg:text-left">
        STAY UP TO DATE ABOUT OUR LATEST OFFERS
      </h5>

      {/* Input Section */}
      <div className="flex flex-col items-center lg:items-end space-y-3 lg:space-y-4 w-full lg:w-auto">
        {/* Input Field */}
        <div className="flex items-center w-full lg:w-[350px] bg-white rounded-full px-4 py-2 shadow-md">
          <TfiEmail className="text-gray-500 mr-3" />
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-grow bg-transparent focus:outline-none text-sm text-gray-700"
          />
        </div>
        {/* Subscribe Button */}
        <button className="w-full lg:w-[350px] bg-white text-black font-semibold rounded-full py-2 text-center shadow-md hover:bg-gray-100 transition">
          Subscribe to Newsletter
        </button>
      </div>
    </div>
  );
}
