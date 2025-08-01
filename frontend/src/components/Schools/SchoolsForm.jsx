import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Box, TextField, Button } from '@mui/material';

const SchoolsForm = ({ onSuccess, editingItem, setEditingItem }) => {
  const [form, setForm] = useState({
    ten_truong: '',
    cap_truong: '',
    so_luong_hoc_sinh: '',
    dat_chuan_qg: '',
    year: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (isNaN(Number(form.so_luong_hoc_sinh))) errs.so_luong_hoc_sinh = 'Phải là số';
    if (isNaN(Number(form.year))) errs.year = 'Phải là số';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  useEffect(() => {
    if (editingItem) {
      setForm({
        ten_truong: editingItem.ten_truong,
        cap_truong: editingItem.cap_truong,
        so_luong_hoc_sinh: editingItem.so_luong_hoc_sinh,
        dat_chuan_qg: editingItem.dat_chuan_qg,
        year: editingItem.year,
      });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const token = sessionStorage.getItem('token');

    try {
      if (editingItem) {
        await api.put(`/schools/${editingItem.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingItem(null);
      } else {
        await api.post('/schools', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      onSuccess();
      setForm({
        ten_truong: '',
        cap_truong: '',
        so_luong_hoc_sinh: '',
        dat_chuan_qg: '',
        year: '',
      });
    } catch (err) {
      console.error('Lỗi khi gửi dữ liệu:', err);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setForm({
      ten_truong: '',
      cap_truong: '',
      so_luong_hoc_sinh: '',
      dat_chuan_qg: '',
      year: '',
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexWrap="wrap"
      gap={2}
      mb={2}
    >
      <TextField
        label="Tên trường"
        name="ten_truong"
        value={form.ten_truong}
        onChange={handleChange}
        required
      />
      <TextField
        label="Cấp trường"
        name="cap_truong"
        value={form.cap_truong}
        onChange={handleChange}
        required
      />
      <TextField
        error={!!errors.so_luong_hoc_sinh}
        helperText={errors.so_luong_hoc_sinh} 
        label="Số học sinh"
        name="so_luong_hoc_sinh"
        value={form.so_luong_hoc_sinh}
        onChange={handleChange}
        required
      />
      <TextField
        label="Đạt chuẩn QG"
        name="dat_chuan_qg"
        value={form.dat_chuan_qg}
        onChange={handleChange}
        required
      />
      <TextField
        error={!!errors.year}
        helperText={errors.year} 
        label="Năm"
        name="year"
        value={form.year}
        onChange={handleChange}
        required
      />
      <Box display="flex" alignItems="center" gap={1}>
        <Button type="submit" variant="contained" color={editingItem ? 'warning' : 'primary'}>
          {editingItem ? 'Cập nhật' : 'Thêm'}
        </Button>
        {editingItem && (
          <Button variant="outlined" color="inherit" onClick={handleCancel}>
            Huỷ
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SchoolsForm;
