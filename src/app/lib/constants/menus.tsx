import {
  Assignment,
  Description,
  Grading,
  PublishedWithChanges,
  School,
} from "@mui/icons-material";
import { TMenuItem } from "../../../../global";

export const menus: TMenuItem[] = [
  {
    label: "Outcome-Based Education",
    type: "section",
    children: [
      {
        label: "Curriculum Management",
        type: "collapsible",
        icon: <School />,
        children: [
          {
            label: "Informatics",
            type: "nav-item",
            uri: "/obe/curriculum/IF",
          },
          {
            label: "Information System",
            type: "nav-item",
            uri: "/obe/curriculum/SI",
          },
          {
            label: "Information Technology",
            type: "nav-item",
            uri: "/obe/curriculum/TI",
          },
        ],
      },
      {
        label: "Evaluasi CPL",
        type: "collapsible",
        icon: <PublishedWithChanges sx={{ fontSize: 20 }} />,
        children: [
          {
            label: "Informatics",
            type: "nav-item",
            uri: "/obe/evaluasi-cpl/list/IF",
          },
          {
            label: "Information System",
            type: "nav-item",
            uri: "/obe/evaluasi-cpl/list/SI",
          },
          {
            label: "Information Technology",
            type: "nav-item",
            uri: "/obe/evaluasi-cpl/list/DKV",
          },
        ],
      },
      {
        label: "RPS Management",
        type: "nav-item",
        icon: <Description sx={{ fontSize: 20 }} />,
        uri: "/obe/all-list-rps",
      },
      {
        label: "List RPS",
        type: "nav-item",
        icon: <Assignment sx={{ fontSize: 20 }} />,
        uri: `/obe/list-rps`,
      },
      {
        label: "Evaluasi CPMK",
        type: "collapsible",
        icon: <Grading sx={{ fontSize: 20 }} />,
        children: [
          {
            label: "Mata Kuliah",
            type: "nav-item",
            uri: `/obe/evaluasi-matakuliah`,
          },
          {
            label: "Mahasiswa (Individu)",
            type: "nav-item",
            uri: `/obe/evaluasi-mahasiswa`,
          },
        ],
      },
    ],
  },
];
