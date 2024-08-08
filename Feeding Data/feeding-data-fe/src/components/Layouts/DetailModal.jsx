import React, { useEffect, useState } from "react";
import Modal from "../Fragments/Modal";
import Button from "../Elements/Button";
import { IoClose } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { GoClock } from "react-icons/go";
import { PiMoneyLight } from "react-icons/pi";
import Icons from "../Elements/Icons";
import TitleText from "../Elements/TitleText";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

const DetailModal = (props) => {
  const { open, handleOpen, data } = props;

  const [bullets, setBullets] = useState();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    if (data.bullet_points) {
      let bp = data.bullet_points.split(";");
      setBullets(bp);
    }
  }, []);

  const handleEditModal = () => {
    setOpenEditModal(!openEditModal);
  };

  const handleDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  return (
    <>
      <Modal open={open} handleOpen={handleOpen}>
        <Button
          event={handleOpen}
          classname="fixed top-1/2 left-[47%] px-4 py-8 -left-4 bg-white rounded-l-full"
        >
          <IoClose size={30} />
        </Button>
        <div className="absolute top-0 min-h-screen overflow-auto right-0 bg-white w-1/2 p-8 flex flex-col gap-8">
          <div className="space-y-2">
            <TitleText classname="text-4xl" text={data.title} />
            <TitleText classname="uppercase text-2xl" text={data.company} />
          </div>
          <div className="space-y-4">
            <Icons icon={<SlLocationPin size={20} />} text={data.location} />
            <Icons
              icon={<HiOutlineBuildingOffice size={20} />}
              text={`${data.sub_classification} (${data.classification})`}
            />
            <Icons icon={<GoClock size={20} />} text={data.job_type} />
            <Icons icon={<PiMoneyLight size={20} />} text={data.salary} />
            <div className="text-gray-500">{data.listing_date}</div>
          </div>
          <div className="space-y-2">
            <TitleText classname="text-xl" text="Information" />
            <p className="leading-7">{data.teaser ? data.teaser : "-"}</p>
          </div>
          <div className="space-y-2">
            <TitleText classname="text-xl" text="Other Info" />
            <ul>
              {bullets ? (
                bullets?.map((bullet, i) => <li key={i}>• {bullet}</li>)
              ) : (
                <span>-</span>
              )}
            </ul>
          </div>
          <div className="space-x-4 inline-flex justify-center">
            <Button
              classname="px-4 py-2 bg-amber-500 rounded-md text-white"
              event={handleEditModal}
            >
              Edit
            </Button>
            <Button
              classname="px-4 py-2 bg-red-500 rounded-md text-white"
              event={handleDeleteModal}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
      <EditModal open={openEditModal} handleOpen={handleEditModal} />
      <DeleteModal open={openDeleteModal} handleOpen={handleDeleteModal} />
    </>
  );
};

export default DetailModal;
