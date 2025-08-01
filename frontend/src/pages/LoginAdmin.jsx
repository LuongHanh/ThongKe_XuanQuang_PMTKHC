import { useState } from 'react';
import {
  Box, Button, Container, TextField, Typography, Paper
} from '@mui/material';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', form);
      const { token } = res.data;
      sessionStorage.setItem('token', token);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError('Tài khoản hoặc mật khẩu không đúng!');
    }
  };

  return (
    <Container maxWidth="sm" sx={{minHeight: '600px', display: 'flex', justifyContent: "center", alignItems: 'center'}}>
      <Paper elevation={3} sx={{ p: 4, mt: 10 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Đăng nhập Quản trị
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Tên đăng nhập"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Mật khẩu"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Đăng nhập
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginAdmin;
