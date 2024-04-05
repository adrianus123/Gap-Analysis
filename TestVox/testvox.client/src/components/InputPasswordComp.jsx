import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
function InputTextComp({ id, name }) {
    const [isOpen, setIsOpen] = useState(false);

    const seePassword = () => {
        setIsOpen(!isOpen);
    }
  return (
      <div className="flex flex-col items-start">
          <label for={id} className="text-md text-white after:content-['*']">{name}</label>
          <div className="relative w-full">
              {
                  isOpen ?
                      <FaRegEyeSlash onClick={seePassword} className="absolute text-white right-2.5 top-2.5 cursor-pointer" />
                      :
                      <FaRegEye onClick={seePassword} className="absolute text-white right-2.5 top-2.5 cursor-pointer" />
              }
              <input id={id} name={id} type={isOpen ? "text" : "password"} className="px-2 border-2 text-white rounded w-full leading-8 bg-transparent focus:outline-none" required />
          </div>
      </div>
  );
}

export default InputTextComp;