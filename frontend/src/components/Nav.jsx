import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Nav = () => {
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/admin');
  };

  const handleBackHome = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const navItems = [
    { label: 'Quản trị', path: '/admin/dashboard' },
    { label: 'Xuất dữ liệu', path: '/admin/export' },
  ];

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        zIndex: 1300, // đảm bảo nổi lên trên
        height: 56,
        justifyContent: 'center'
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          minHeight: '56px !important',
          px: 2
        }}
      >
        <Typography
          variant="subtitle1"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'white',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <img
            src="/favicon.png"
            alt="Logo"
            style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid white' }}
          />
          Thống kê xã Xuân Quang
        </Typography>

        <Box>
          {isAdminRoute && token && (
            <>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  color="inherit"
                  sx={{
                    fontSize: '0.875rem',
                    textDecoration:
                      location.pathname === item.path ? 'underline' : 'none',
                    textUnderlineOffset: '4px',
                    mx: 0.5
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                onClick={handleLogout}
                color="inherit"
                sx={{ fontSize: '0.875rem', mx: 0.5 }}
              >
                Đăng xuất
              </Button>
            </>
          )}
          {!isAdminRoute && 
            <Button
                onClick={handleLogout}
                color="inherit"
                sx={{ fontSize: '0.875rem', mx: 0.5 }}
              >
                Quản trị
            </Button>
          }
          {isAdminRoute && !token &&
            <Button
                onClick={handleBackHome}
                color="inherit"
                sx={{ fontSize: '0.875rem', mx: 0.5 }}
              >
                Trang chủ
            </Button>
          }
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
