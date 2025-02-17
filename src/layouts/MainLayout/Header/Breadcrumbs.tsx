import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  let breadcrumbPath = "";

  return (
    <div className="breadcrumbs">
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        breadcrumbPath += `/${name}`;
        const isLast = index === pathnames.length - 1;
        console.log(name, name);

        return isLast ? (
          <span key={breadcrumbPath}> / {t(name)}</span>
        ) : (
          <span key={breadcrumbPath}>
            {" "}
            / <Link to={breadcrumbPath}>{t(name)}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
