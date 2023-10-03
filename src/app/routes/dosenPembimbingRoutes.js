import Page from "@jumbo/shared/Page";
import StudentInformation from "app/pages/BimbinganAkademik/DesenPembimbing/StudentInformation";

const dosenPembimbingRoutes = [
  {
    path: "/bimbingan-akademik/student-information",
    element: <Page component={StudentInformation} />,
  },
];

export default dosenPembimbingRoutes;
