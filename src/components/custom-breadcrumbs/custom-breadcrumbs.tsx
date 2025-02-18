import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { BreadcrumbsLink } from './breadcrumb-link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export function CustomBreadcrumbs() {
  const breadcrumbs = useSelector((state: RootState) => state.breadcrumbs);

  const { links = [], action, moreLink, activeLast, slotProps, sx, ...other } = breadcrumbs;
  const lastLink = links[links.length - 1]?.name;

  const renderLinks = (
    <Breadcrumbs separator='/' sx={{
      ...slotProps?.breadcrumbs,
      '& .MuiLink-root': {
        fontSize: 14,
      },
      '& .MuiBreadcrumbs-separator': {
        color: '#fff'
      }
    }} {...other}>
      {links.map((link, index) => (
        <BreadcrumbsLink
          key={link.name ?? index}
          link={link}
          activeLast={activeLast}
          disabled={link.name === lastLink}
        />
      ))}
    </Breadcrumbs>
  );

  const renderAction = <Box sx={{ flexShrink: 0, ...slotProps?.action }}> {action} </Box>;

  const renderMoreLink = (
    <Box component="ul">
      {moreLink?.map((href) => (
        <Box key={href} component="li" sx={{ display: 'flex' }}>
          <Link href={href} variant="body2" target="_blank" rel="noopener" sx={slotProps?.moreLink}>
            {href}
          </Link>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box gap={2} display="flex" flexDirection="column" sx={sx} {...other}>
      <Box display="flex" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>

          {!!links.length && renderLinks}
        </Box>

        {action && renderAction}
      </Box>

      {!!moreLink && renderMoreLink}
    </Box>
  );
}
