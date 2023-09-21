import { LAYOUT_CONTAINER_STYLES } from "@jumbo/utils/constants/layout";
import { mainTheme } from "../themes/main/filkom";
import { headerTheme } from "../themes/header/filkom";
import { sidebarTheme } from "../themes/sidebar/filkom";
import { footerTheme } from "../themes/footer/default";
import LAYOUT_NAMES from "../layouts/layouts";
import { createJumboTheme } from "@jumbo/utils";

const config = {
  defaultLayout: LAYOUT_NAMES.VERTICAL_DEFAULT,
  containerStyle: LAYOUT_CONTAINER_STYLES.FLUID,

  theme: createJumboTheme(mainTheme, headerTheme, sidebarTheme, footerTheme),
};

export { config };
