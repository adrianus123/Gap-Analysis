import React, { useState } from "react";
import { SlLocationPin } from "react-icons/sl";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { PiMoneyLight } from "react-icons/pi";
import { SiOnlyoffice } from "react-icons/si";
import TitleText from "../Elements/TitleText";
import Icons from "../Elements/Icons";
import DetailModal from "./DetailModal";

const Card = (props) => {
  const { data } = props;

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div
        onClick={handleShowModal}
        className="rounded-lg p-4 bg-white shadow-md space-y-4 cursor-pointer transition ease-in duration-200 hover:scale-105"
      >
        <div className="space-y-1">
          <TitleText classname="text-xl" text={data.title} />
          <TitleText classname="text-lg" text={data.company} />
        </div>
        <div>
          <Icons icon={<SlLocationPin size={15} />} text={data.location} />
          <Icons icon={<PiMoneyLight size={15} />} text={data.salary} />
          <Icons
            icon={<SiOnlyoffice size={15} />}
            text={data.sub_classification}
          />
          <Icons
            icon={<HiOutlineBuildingOffice size={15} />}
            text={data.classification}
          />
        </div>
        <p className="font-normal text-base text-slate-500">
          {data.listing_date}
        </p>
      </div>
      <DetailModal open={showModal} handleOpen={handleShowModal} data={data} />
    </>
  );
};

export default Card;
