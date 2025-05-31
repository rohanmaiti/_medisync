import {
  Input,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  Dropdown,
  IconButton,
  Sheet,
} from "@mui/joy";
import Person from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useAuthStore } from "../store/useAuthStore";

export const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { authUser, userType, isCheckingAuth } = useAuthStore();

  const handleLoginUser = (typeOfUser: string) => {
    navigate("/login", { state: { userType: typeOfUser } });
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
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
        onClick={()=>setMobileMenuOpen(false)}
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
        onClick={()=>setMobileMenuOpen(false)}
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
        onClick={()=>setMobileMenuOpen(false)}
      >
        About
      </Link>
      <Link
        underline="none"
        variant="plain"
        color="primary"
        level="body-lg"
        onClick={() => {setMobileMenuOpen(false); return navigate("/book-opd-form")}}
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
        onClick={()=>setMobileMenuOpen(false)}
      >
        Emergency
      </Link>
      {authUser && userType === "super_admin" && (
        <NavLink to="/admindashboard">Admin dashboard</NavLink>
      )}
    </>
  );

  return (
    <>
      {isCheckingAuth ? (
        <div className="flex justify-center items-center h-screen">
          <img src="loading.gif" alt="Loading..." width={100} />
        </div>
      ) : (
        <div className="bg-zinc-900 p-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="logo.png"
              alt="medisync logo"
              width={90}
              className="p-2 hover:cursor-pointer"
            />
            {/* Search input (hidden on small) */}
            <div className="hidden md:flex items-center gap-10">
              <Input
                placeholder="Search Hospitals"
                variant="outlined"
                color="neutral"
                sx={{
                  border: "1px solid grey",
                  backgroundColor: "#1f2937",
                  color: "white",
                  borderRadius: "8px",
                  width: "20rem",
                }}
              />
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex gap-10 items-center">
            <NavLinks />
          </div>

          {/* Right side (Login/Profile) */}
          <div className="hidden lg:block px-5">
            {authUser ? (
              <Dropdown>
                <MenuButton
                  slots={{ root: IconButton }}
                  slotProps={{ root: { variant: "plain", color: "primary" } }}
                >
                  {/* <Avatar alt="Profile" size="md" /> */}
                  <Person/>
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
                bgcolor: "background.level1",
                zIndex: 50,
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
              className="lg:hidden"
            >
              <NavLinks />
              {authUser ? (
                <>
                  <Link onClick={() => navigate("/profile")}>Profile</Link>
                  <Link onClick={() => navigate("/dashboard")}>Dashboard</Link>
                  <Link onClick={handleLogout} sx={{ color: "red" }}>
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    sx={{ borderBottom: "1px solid", padding: "4px" }}
                    onClick={() => { setMobileMenuOpen(false); return handleLoginUser("user")}}
                  >
                    Login as User
                  </Link>
                  <Link
                    sx={{ borderBottom: "1px solid", padding: "4px" }}
                    onClick={() => {setMobileMenuOpen(false); return handleLoginUser("doctor")}}
                  >
                    Doctor
                  </Link>
                  <Link
                    sx={{ borderBottom: "1px solid", padding: "4px" }}
                    onClick={() => {setMobileMenuOpen(false); return handleLoginUser("inventory manager")}}
                  >
                    Inventory Manager
                  </Link>
                  <Link
                    sx={{ borderBottom: "1px solid", padding: "4px" }}
                    onClick={() => {setMobileMenuOpen(false); return handleLoginUser("receptionist")}}
                  >
                    Reception
                  </Link>
                  <Link
                    sx={{ padding: "4px" }}
                    onClick={() => {setMobileMenuOpen(false); return handleLoginUser("hospital admin")}}
                  >
                    Hospital Admin
                  </Link>
                </>
              )}
            </Sheet>
          )}
        </div>
      )}
    </>
  );
};
