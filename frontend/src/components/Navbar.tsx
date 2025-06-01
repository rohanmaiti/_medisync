import {
  Link,
  Menu,
  MenuButton,
  MenuItem,
  Dropdown,
  IconButton,
  Sheet,
} from "@mui/joy";
import { ClickAwayListener } from "@mui/material";
import Person from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useAuthStore } from "../store/useAuthStore";

export const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { authUser, isCheckingAuth } = useAuthStore();

  const handleLoginUser = (typeOfUser: string) => {
    navigate("/login", { state: { userType: typeOfUser } });
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };
  const handleClickAway = () => {
    setMobileMenuOpen(false);
  };

  const hanlde_dashboard_click = ()=> {
    const userType = authUser?.userType;
    switch (userType){
      case 'hospital_admin' : navigate('/hospitaladmin/dashboard')
    }
  }

  const get_dashboard_button = () => {
        return <button className="bg-gray-700 py-2 px-4 rounded-4xl hover:cursor-pointer text-gray-400 
        transition delay-20 duration-300 ease-in-out hover:-translate-x-1 hover:scale-105 hover:bg-indigo-500 hover:text-white
        " 
        onClick={hanlde_dashboard_click}
        > Your Dashboard</button>
    
  };

  const NavLinks = () => (
    <>
      <Link
        href="/#home"
        underline="none"
        variant="plain"
        color="primary"
        level="body-lg"
        sx={{ "&:hover": { backgroundColor: "#6200ea", color: "white" } }}
        onClick={() => setMobileMenuOpen(false)}
      >
        Home
      </Link>
      <Link
        href="/#services"
        underline="none"
        variant="plain"
        color="primary"
        level="body-lg"
        sx={{ "&:hover": { backgroundColor: "#6200ea", color: "white" } }}
        onClick={() => setMobileMenuOpen(false)}
      >
        Services
      </Link>
      <Link
        href="/#about"
        underline="none"
        variant="plain"
        color="primary"
        level="body-lg"
        sx={{ "&:hover": { backgroundColor: "#6200ea", color: "white" } }}
        onClick={() => setMobileMenuOpen(false)}
      >
        About
      </Link>
      <Link
        underline="none"
        variant="plain"
        color="primary"
        level="body-lg"
        onClick={() => {
          setMobileMenuOpen(false);
          return navigate("/book-opd-form");
        }}
        sx={{ "&:hover": { backgroundColor: "#6200ea", color: "white" } }}
      >
        Book OPD
      </Link>
      <Link
        href="emergency-service-page"
        underline="none"
        variant="solid"
        level="body-lg"
        color="danger"
        sx={{ "&:hover": { backgroundColor: "#ff0000", color: "#eeeeee" } }}
        onClick={() => setMobileMenuOpen(false)}
      >
        Emergency
      </Link>
      {authUser ? get_dashboard_button() : ""}
    </>
  );

  return (
    <div className="w-screen">
      {isCheckingAuth ? (
        <div className="flex justify-center items-center h-screen">
          <img src="loading.gif" alt="Loading..." width={100} />
        </div>
      ) : (
        <div className="bg-zinc-900 p-3 flex  justify-between items-center">
          {/* Logo */}
          <div className="flex items-center flex-none pr-20">
            <img
              src="logo.png"
              alt="medisync logo"
              width={90}
              className="p-2 hover:cursor-pointer"
            />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex gap-10 items-center flex-1 justify-start">
            <NavLinks />
          </div>

          {/* Right side (Login/Profile) */}
          <div className="hidden lg:block px-5 flex-none">
            {authUser ? (
              <Dropdown>
                <MenuButton
                  slots={{ root: IconButton }}
                  slotProps={{ root: { variant: "plain", color: "primary" } }}
                >
                  {/* <Avatar alt="Profile" size="md" /> */}
                  <Person />
                </MenuButton>
                <Menu
                  placement="bottom-end"
                  sx={{
                    bgcolor: "#b5cef5",
                  }}
                >
                  <MenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                    Logout
                  </MenuItem>
                </Menu>
              </Dropdown>
            ) : (
              <Dropdown>
                <MenuButton variant="outlined" color="primary">
                  Login
                </MenuButton>
                <Menu
                  placement="bottom-end"
                  sx={{
                    bgcolor: "#b5cef5",
                  }}
                >
                  <MenuItem
                    sx={{ color: "#16191c", borderBottom: "1px solid #86a3d1" }}
                    onClick={() => handleLoginUser("user")}
                  >
                    User
                  </MenuItem>
                  <MenuItem
                    sx={{ color: "#16191c", borderBottom: "1px solid #86a3d1" }}
                    onClick={() => handleLoginUser("doctor")}
                  >
                    Doctor
                  </MenuItem>
                  <MenuItem
                    sx={{ color: "#16191c", borderBottom: "1px solid #86a3d1" }}
                    onClick={() => handleLoginUser("inventory manager")}
                  >
                    Inventory Manager
                  </MenuItem>
                  <MenuItem
                    sx={{ color: "#16191c", borderBottom: "1px solid #86a3d1" }}
                    onClick={() => handleLoginUser("receptionist")}
                  >
                    Reception
                  </MenuItem>
                  <MenuItem
                    sx={{ color: "#16191c" }}
                    onClick={() => handleLoginUser("hospital admin")}
                  >
                    Hospital Admin
                  </MenuItem>
                </Menu>
              </Dropdown>
            )}
          </div>

          {/* Mobile menu toggle */}

          <ClickAwayListener onClickAway={handleClickAway}>
            <div>
              <div className="lg:hidden">
                <IconButton
                  variant="plain"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
              </div>

              {/* Mobile menu dropdown */}
              {mobileMenuOpen && (
                <Sheet
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    bgcolor: "#a2d1f5",
                    zIndex: 50,
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    borderBottomLeftRadius: "5px",
                    borderBottomRightRadius: "5px",
                  }}
                  className="lg:hidden"
                >
                  <NavLinks />
                  {authUser ? (
                    <>
                      <Link onClick={() => navigate("/profile")}>Profile</Link>
                      <Link onClick={() => navigate("/dashboard")}>
                        Dashboard
                      </Link>
                      <Link onClick={handleLogout} sx={{ color: "red" }}>
                        Logout
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        sx={{ borderBottom: "1px solid", padding: "4px" }}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          return handleLoginUser("user");
                        }}
                      >
                        Login as User
                      </Link>
                      <Link
                        sx={{ borderBottom: "1px solid", padding: "4px" }}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          return handleLoginUser("doctor");
                        }}
                      >
                        Doctor
                      </Link>
                      <Link
                        sx={{ borderBottom: "1px solid", padding: "4px" }}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          return handleLoginUser("inventory manager");
                        }}
                      >
                        Inventory Manager
                      </Link>
                      <Link
                        sx={{ borderBottom: "1px solid", padding: "4px" }}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          return handleLoginUser("receptionist");
                        }}
                      >
                        Reception
                      </Link>
                      <Link
                        sx={{ padding: "4px" }}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          return handleLoginUser("hospital admin");
                        }}
                      >
                        Hospital Admin
                      </Link>
                    </>
                  )}
                </Sheet>
              )}
            </div>
          </ClickAwayListener>
        </div>
      )}
    </div>
  );
};
