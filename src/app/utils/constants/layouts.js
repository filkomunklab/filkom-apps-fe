import VerticalDefault from "../../layouts/vertical-default/VerticalDefault";
import SoloPage from "../../layouts/solo-page/SoloPage";
import BarePage from "app/layouts/bare-page/BarePage";

const LAYOUT_NAMES = {
  VERTICAL_DEFAULT: "vertical-default",
  SOLO_PAGE: "solo-page",
  BARE_PAGE: "bare-page",
};

const LAYOUTS = [
  {
    name: LAYOUT_NAMES.VERTICAL_DEFAULT,
    label: "Vertical Default",
    component: VerticalDefault,
  },
  {
    name: LAYOUT_NAMES.SOLO_PAGE,
    label: "Solo Page",
    component: SoloPage,
  },
  {
    name: LAYOUT_NAMES.BARE_PAGE,
    label: "Bare Page",
    component: BarePage,
  },
];

export { LAYOUTS, LAYOUT_NAMES };
