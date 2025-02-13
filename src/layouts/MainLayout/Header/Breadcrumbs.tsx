import { Link, Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";

import navigation from "@/routes/navigation";
import { useLocation } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

type NameMap = Record<string, { title: string; linkable: boolean }>;

const nameMap = navigation.reduce<NameMap>((acc, section) => {
  section.links.forEach((link) => {
    if (link.children) {
      acc[link?.path] = { title: link?.title, linkable: false };
      link.children.forEach((nestedLink) => {
        acc[nestedLink.path] = {
          title: nestedLink.title,
          linkable: true,
        };
      });
    } else {
      acc[link.path] = { title: link.title, linkable: true };
    }
  });
  return acc;
}, {});

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <MuiBreadcrumbs
      aria-label="breadcrumb"
      sx={{ color: "primary.contrastText" }}
    >
      <Link href="#/" underline="hover" color="inherit">
        Daily Wins
      </Link>
      {pathnames.map((_, index) => {
        const last = index === pathnames.length - 1;
        const to = `#/${pathnames.slice(0, index + 1).join("/")}`;
        const link = nameMap[to.replace("#", "")];

        return (
          <Fragment key={to}>
            {/* {index > 0 && <ArrowBackIosIcon fontSize="small" />} */}
            {last || !link?.linkable ? (
              <Typography color="inherit">
                {link?.title}
              </Typography>
            ) : (
              <Link underline="hover" color="inherit" href={to}>
                {link?.title}
              </Link>
            )}
          </Fragment>
        );
      })}
    </MuiBreadcrumbs>
  );
};
export default Breadcrumbs;
