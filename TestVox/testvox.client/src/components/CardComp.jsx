import { MdDelete } from "react-icons/md";
import { FaEdit, FaEye } from "react-icons/fa";

function CardComp() {
  return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg relative overflow-hidden group">
          <img className="w-full" src="https://asset.kompas.com/crops/l1mOj4plbOspGHPx6lsIyKJ0Fl0=/0x185:1643x1280/750x500/data/photo/2022/08/11/62f48c1241815.jpg" alt="Sunset in the mountains" />
          <div className="px-6 py-4">
              <div className="font-bold text-md text-center">The Coldest Sunset</div>
          </div>

          <div className="absolute h-full w-full bg-black/70 flex items-center justify-evenly -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button className="text-white opacity-70 hover:opacity-100 flex flex-col items-center">
                  <FaEye className="text-3xl" />
                  <span>Detail</span>
              </button>
              <button className="text-white opacity-70 hover:opacity-100 flex flex-col items-center">
                  <FaEdit className="text-3xl" />
                  <span>Edit</span>
              </button>
              <button className="text-white opacity-70 hover:opacity-100 flex flex-col items-center">
                  <MdDelete className="text-3xl" />
                  <span>Delete</span>
              </button>
          </div>
      </div>
  );
}

export default CardComp;