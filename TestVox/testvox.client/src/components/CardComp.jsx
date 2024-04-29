import { MdDelete } from "react-icons/md";
import { FaEdit, FaEye } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import CreateUpdateModalComp from "./modal/CreateUpdateModalComp";
import DetailModalComp from "./modal/DetailModalComp";
import ConfirmDeleteModal from "./modal/ConfirmDeleteModal";
import { DeleteOrganizer } from "../apis";
import PropTypes from "prop-types";
import AlertComp from "./AlertComp";
import apiContext from "../apis/context";

function CardComp({ id, name, imageUrl }) {
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alert, setAlert] = useState({
    isError: false,
    message: "",
  });

  const handleModalUpdate = () => setOpenModalUpdate(!openModalUpdate);
  const handleModalDetail = () => setOpenModalDetail(!openModalDetail);
  const handleModalDelete = () => setOpenModalDelete(!openModalDelete);
  const handleOpenAlert = () => setOpenAlert(!openAlert);

  const {handleRefresh} = useContext(apiContext);

  const deleteOrganizer = async (id) => {
    const response = await DeleteOrganizer(id);
    console.log(response);

    handleModalDelete();
    handleOpenAlert();

    if (response.status !== 204) {
      setAlert((value) => ({
        isError: true,
        message: response.data,
      }));
      return;
    }

    setAlert((value) => ({
      isError: false,
      message: "Success",
    }));

    handleRefresh();
  };

  return (
    <>
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
          <Typography
            variant="h5"
            color="blue-gray"
            className="text-center text-xs md:text-lg"
          >
            {name}
          </Typography>
        </CardBody>
        <div className="absolute h-full w-full bg-black/70 flex flex-col lg:flex-row items-center justify-evenly -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
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
      <AlertComp
        open={openAlert}
        handleOpen={handleOpenAlert}
        isError={alert.isError}
        message={alert.message}
      />
    </>
  );
}

CardComp.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default CardComp;
