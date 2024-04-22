import { MdDelete } from "react-icons/md";
import { FaEdit, FaEye } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import CreateUpdateModalComp from "./modal/CreateUpdateModalComp";
import DetailModalComp from "./modal/DetailModalComp";
import ConfirmDeleteModal from "./modal/ConfirmDeleteModal";
import { DeleteOrganizer } from "../apis";

function CardComp({ id, name, imageUrl }) {
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleModalUpdate = () => setOpenModalUpdate(!openModalUpdate);
  const handleModalDetail = () => setOpenModalDetail(!openModalDetail);
  const handleModalDelete = () => setOpenModalDelete(!openModalDelete);

  const deleteOrganizer = async (id) => {
    const response = await DeleteOrganizer(id);
    console.log(response);

    handleModalDelete();
  };

  return (
    <Card className="max-w-full shadow-md overflow-hidden relative overflow-hidden group">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <img src={imageUrl} alt={name} />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="text-center text-xs md:text-lg">
          {name}
        </Typography>
      </CardBody>
      <div className="absolute h-full w-full bg-black/70 flex flex-col md:flex-row items-center justify-evenly -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <Button
          onClick={handleModalDetail}
          variant="text"
          className="text-white opacity-70 hover:opacity-100 flex flex-col items-center"
        >
          <FaEye className="text-lg md:text-3xl" />
          <span>Detail</span>
        </Button>
        <Button
          onClick={handleModalUpdate}
          variant="text"
          className="text-white opacity-70 hover:opacity-100 flex flex-col items-center"
        >
          <FaEdit className="text-lg md:text-3xl" />
          <span>Edit</span>
        </Button>
        <Button
          onClick={handleModalDelete}
          variant="text"
          className="text-white opacity-70 hover:opacity-100 flex flex-col items-center"
        >
          <MdDelete className="text-lg md:text-3xl" />
          <span>Delete</span>
        </Button>
      </div>

      <CreateUpdateModalComp
        id={id}
        isUpdate={true}
        open={openModalUpdate}
        handleOpen={handleModalUpdate}
      />
      <DetailModalComp
        open={openModalDetail}
        handleOpen={handleModalDetail}
        name={name}
        imageUrl={imageUrl}
      />
      <ConfirmDeleteModal
        open={openModalDelete}
        handleOpen={handleModalDelete}
        action={() => deleteOrganizer(id)}
        isAccount={false}
      />
    </Card>
  );
}

export default CardComp;
