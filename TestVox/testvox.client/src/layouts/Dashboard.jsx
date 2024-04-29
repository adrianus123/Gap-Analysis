import { MdOutlineAddCircleOutline } from "react-icons/md";
import PaginationComp from "../components/PaginationComp";
import CardComp from "../components/CardComp";
import { useContext, useEffect, useState } from "react";
import { GetOrganizers } from "../apis";
import { Button, Typography } from "@material-tailwind/react";
import CreateUpdateModalComp from "../components/modal/CreateUpdateModalComp";
import SpinnerComp from "../components/SpinnerComp";
import apiContext from "../apis/context";

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [active, setActive] = useState(1);
  const [size, setSize] = useState(10);

  const getData = async (page, size) => {
    setLoading(true);
    const response = await GetOrganizers(page, size);
    setTotalPages(response.meta.pagination.total_pages);
    setData(response.data);
    setLoading(false);
  };

  const handleOpen = () => setOpenModal(!openModal);
  const {isRefresh, handleRefresh} = useContext(apiContext);

  useEffect(() => {
    if (isRefresh) {
      getData(active, size);
      handleRefresh();
    }
  }, [active, size, isRefresh]);

  return (
    <>
      {loading ? (
        <SpinnerComp />
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded shadow-md">
            <Typography variant="h2" className="text-xl md:text-4xl text-gray-900">
              Organizers
            </Typography>
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data?.map((dt) => (
                <CardComp
                  key={dt.id}
                  id={dt.id}
                  name={dt.organizerName}
                  imageUrl={
                    dt.imageLocation.startsWith("http")
                      ? dt.imageLocation
                      : "https://loremflickr.com/640/480"
                  }
                />
              ))}
            </div>
          </div>
          <PaginationComp
            active={active}
            setActive={setActive}
            size={size}
            setSize={setSize}
            totalPages={totalPages}
          />
        </div>
      )}

      <CreateUpdateModalComp
        isUpdate={false}
        open={openModal}
        handleOpen={handleOpen}
      />
    </>
  );
}

export default Dashboard;
