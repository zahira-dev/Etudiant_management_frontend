import { Fragment, PropsWithChildren } from 'react';

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
interface LayoutProps {
  title?: string;
}

const Layout = (props: PropsWithChildren<LayoutProps>) => {
  const navigate = useNavigate();
  const navItems = [
    <Button sx={{ color: '#fff' }} onClick={() => navigate('/')}>
      Home
    </Button>,
  ];

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <AppBar component="nav" sx={{ position: 'relative', display: 'block' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student Management
          </Typography>
          <Box>
            {navItems.map((item, index) => (
              <Fragment key={index}> {item}</Fragment>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {props.children}
    </Box>
  );
};

export default Layout;
