import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        py: 2,
        px: 3,
        bgcolor: 'background.paper',
        borderTop: '1px solid #ddd',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2025 Hệ thống thống kê – Bộ phận Quản trị.
        &nbsp;|&nbsp;
        <Link href="https://www.facebook.com/henry.hanh.58" target="_blank" rel="noopener" underline="hover">
          Liên hệ hỗ trợ
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
