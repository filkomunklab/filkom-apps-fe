import { LAYOUT_CONTAINER_STYLES } from "@jumbo/utils/constants/layout";
import { mainTheme } from "../themes/main/filkom";
import { headerTheme } from "../themes/header/filkom";
import { sidebarTheme } from "../themes/sidebar/filkom";
import { footerTheme } from "../themes/footer/default";
import LAYOUT_NAMES from "../layouts/layouts";
import { createJumboTheme } from "@jumbo/utils";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import authService from "app/services/Auth/auth.service";

const config = {
  defaultLayout: LAYOUT_NAMES.VERTICAL_DEFAULT,
  containerStyle: LAYOUT_CONTAINER_STYLES.FLUID,
  authSetting: {
    axiosObject: jwtAuthAxios,
    fallbackPath: "/login",
    getAuthUserService: authService.getCurrentUser,
    redirectNotAuthenticatedPath: "/",
    redirectNoAccess: "/unauthorized",
  },

  theme: createJumboTheme(mainTheme, headerTheme, sidebarTheme, footerTheme),
};

export { config };
