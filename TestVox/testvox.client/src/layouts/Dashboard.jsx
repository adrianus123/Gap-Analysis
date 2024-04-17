import { MdOutlineAddCircleOutline } from "react-icons/md";
import PaginationComp from "../components/PaginationComp";
import CardComp from "../components/CardComp";
import { useEffect, useState } from "react";
import { GetOrganizers } from "../apis";
import { Button, Typography } from "@material-tailwind/react";
import CreateUpdateModalComp from "../components/modal/CreateUpdateModalComp";

function Dashboard() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const getData = async () => {
    const response = await GetOrganizers();
    setData(response.data);
  };

  const handleOpen = () => setOpenModal(!openModal);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-white p-4 rounded shadow-md">
        <Typography variant="h2">Organizers</Typography>
        <Button
          color="blue"
          size="sm"
          className="flex items-center gap-2"
          onClick={handleOpen}
        >
          <MdOutlineAddCircleOutline />
          Add
        </Button>
      </div>
      <div className="bg-white p-4 rounded-md shadow-md">
        <div className="grid grid-cols-4 gap-4">
          {data?.map((dt) => (
            <CardComp
              key={dt.id}
              name={dt.organizerName}
              imageUrl={dt.imageLocation}
            />
          ))}
        </div>
      </div>

      <PaginationComp />
      <CreateUpdateModalComp isUpdate={false} open={openModal} handleOpen={handleOpen} />
    </div>
  );
}

export default Dashboard;
