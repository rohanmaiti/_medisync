import { Grid } from "@mui/joy";
import HospitalAdminContext from "./context";
import HospitalAdminDashboard from "./HospitalAdminDashboard";
import useHospitaladmin from "./useHospitaladmin";

const HospitalAdminPage = () => {
  const value = useHospitaladmin();
  return (
    <HospitalAdminContext.Provider value={value}>
      <HospitalAdminDashboard />
    </HospitalAdminContext.Provider>
  );
};

export default HospitalAdminPage;
