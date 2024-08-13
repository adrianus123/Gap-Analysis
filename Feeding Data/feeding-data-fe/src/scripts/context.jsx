import { createContext, useMemo, useState } from "react";

const apiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [filter, setFilter] = useState({
    tag: "",
    keyword: "",
    location: "",
    type: "",
  });
  const [isRefresh, setIsRefresh] = useState(true);
  const [alert, setAlert] = useState({
    open: false,
    text: "",
    type: "success",
  });

  const handleRefresh = () => setIsRefresh(!isRefresh);
  const showAlert = (type, text) => {
    setAlert({ open: true, type, text });

    setTimeout(() => {
      hideAlert();
    }, 2000);
  };
  const hideAlert = () => setAlert({ ...alert, open: false });
  const handleFilter = (arr) => {
    const { tag, keyword, location, type } = arr;
    setFilter((v) => ({
      tag: tag,
      keyword: keyword,
      location: location,
      type: type,
    }));
  };

  const params = useMemo(
    () => ({
      filter,
      handleFilter,
      isRefresh,
      handleRefresh,
      alert,
      showAlert,
      hideAlert,
    }),
    [filter, isRefresh, alert]
  );

  return <apiContext.Provider value={params}>{children}</apiContext.Provider>;
};

export default apiContext;
