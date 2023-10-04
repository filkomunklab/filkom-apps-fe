import Page from "@jumbo/shared/Page";
import StudentInformation from "app/pages/BimbinganAkademik/DesenPembimbing/StudentInformation";
import StudentProfile from "app/pages/BimbinganAkademik/DesenPembimbing/StudentInformation/StudentProfile";
import History from "app/pages/BimbinganAkademik/DesenPembimbing/History";

const dosenPembimbingRoutes = [
  {
    path: "/bimbingan-akademik/student-information",
    element: <Page component={StudentInformation} />,
  },
  {
    path: "/bimbingan-akademik/student-information/:id",
    element: <Page component={StudentProfile} />,
  },
  {
    path: "/bimbingan-akademik/dospem/history",
    element: <Page component={History} />,
  },
];

export default dosenPembimbingRoutes;
