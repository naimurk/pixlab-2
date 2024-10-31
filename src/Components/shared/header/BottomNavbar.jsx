import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/Components/ui/drawer";
import { useAppContext } from "@/context";
import {
  CreditCard,
  Crown,
  FileText,
  Info,
  LayoutGrid,
  Mail,
  Menu,
  Plus,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RiHome2Line } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";

const BottomNavbar = () => {
  const closeRef = useRef();
  const context = useAppContext();
  const { profileImg, username, _id, planType } = context.sharedState;

  const location = useLocation();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setIsDrawerOpen(
      new URLSearchParams(location.search).get("drawer") === "open"
    );
  }, [location.search]);

  const openDrawer = () => {
    const currentSearchParams = new URLSearchParams(location.search);
    currentSearchParams.set("drawer", "open");
    navigate(`${location.pathname}?${currentSearchParams.toString()}`, {
      replace: true,
    });
  };

  const closeDrawer = () => {
    const currentSearchParams = new URLSearchParams(location.search);
    currentSearchParams.delete("drawer");
    navigate(`${location.pathname}?${currentSearchParams.toString()}`, {
      replace: true,
    });
  };

  return (
    <div
      style={{
        zIndex: 100,
      }}
      className="fixed md:hidden bottom-0 left-0 z-50 w-full bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700 h-[56px]"
    >
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <Link
          to="/more"
          className="flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <LayoutGrid size={22} className="text-gray-500 dark:text-gray-400" />
        </Link>

        <Link
          to="/design"
          className="flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <Plus size={26} className="text-gray-500 dark:text-gray-400" />
        </Link>

        <Link
          to="/"
          className="flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <RiHome2Line size={26} className="text-gray-500 dark:text-gray-400" />
        </Link>

        <Drawer
          open={isDrawerOpen}
          onOpenChange={(open) => {
            if (open) {
              openDrawer();
            } else {
              closeDrawer();
            }
          }}
        >
          <DrawerTrigger onClick={openDrawer}>
            <div className="w-full h-full flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 group">
              {profileImg ? (
                <img src={profileImg} className="h-7 w-7 rounded-full" alt="" />
              ) : (
                <Menu size={26} className="text-gray-500 dark:text-gray-400" />
              )}
            </div>
          </DrawerTrigger>
          <DrawerContent style={{ zIndex: 101 }}>
            <DrawerHeader className="border-b border-gray-200 dark:border-gray-700">
              <DrawerTitle className="text-2xl font-bold">Menu</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 space-y-4">
              {planType === "free" && (
                <Link to="/pricing" className="flex w-full justify-center">
                  <button className="flex items-center text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full transition-all duration-300 hover:from-purple-600 hover:to-pink-600">
                    <Crown className="w-4 h-4 mr-2" />
                    <span>Upgrade to Premium</span>
                  </button>
                </Link>
              )}

              {_id && _id.length > 0 && (
                <Link
                  to={`/${username}`}
                  className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <User className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Profile
                  </span>
                </Link>
              )}

              {!_id || _id.length === 0 ? (
                <Link
                  to="/signup"
                  className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <User className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Sign up
                  </span>
                </Link>
              ) : null}

              <Link
                to="mailto:pixlabeditor@gmail.com"
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <Mail className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  Contact
                </span>
              </Link>

              <Link
                to="/privacy"
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <ShieldCheck className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  Privacy
                </span>
              </Link>

              <Link
                to="/terms"
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <FileText className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">Terms</span>
              </Link>

              <Link
                to="/pricing"
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <CreditCard className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  Pricing
                </span>
              </Link>

              <Link
                to="/about"
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <Info className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  About us
                </span>
              </Link>
            </div>
            <DrawerFooter className="border-t border-gray-200 dark:border-gray-700">
              <DrawerClose onClick={closeDrawer} ref={closeRef}>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center text-white"
                >
                  <X className="w-4 h-4 mr-2" />
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default BottomNavbar;
