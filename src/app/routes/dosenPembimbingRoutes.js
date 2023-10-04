import Page from "@jumbo/shared/Page";
import StudentInformation from "app/pages/BimbinganAkademik/DesenPembimbing/StudentInformation";
import StudentProfile from "app/pages/BimbinganAkademik/DesenPembimbing/StudentInformation/StudentProfile";

const dosenPembimbingRoutes = [
  {
    path: "/bimbingan-akademik/student-information",
    element: <Page component={StudentInformation} />,
  },
  {
    path: "/bimbingan-akademik/student-information/:id",
    element: <Page component={StudentProfile} />,
  },
];

export default dosenPembimbingRoutes;
