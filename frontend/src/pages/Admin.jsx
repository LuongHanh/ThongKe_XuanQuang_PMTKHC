import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container, Paper } from '@mui/material';

const Admin = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/admin/login');
  };

  return (
    <Container maxWidth="sm" sx={{minHeight: '600px', display: 'flex', justifyContent: "center", alignItems: 'center'}}>
      <Paper elevation={4} sx={{ mt: 10, p: 5, textAlign: 'center'}}>
        <Typography variant="h4" gutterBottom>
          🔐 Khu vực quản trị
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Vui lòng đăng nhập để truy cập các chức năng quản trị hệ thống.
        </Typography>
        <Button variant="contained" size="large" onClick={handleLogin}>
          Đăng nhập
        </Button>
      </Paper>
    </Container>
  );
};

export default Admin;
