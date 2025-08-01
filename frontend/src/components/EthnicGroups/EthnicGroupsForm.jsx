import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Box, TextField, Button } from '@mui/material';

const EthnicGroupsForm = ({ onSuccess, editingItem, setEditingItem }) => {
  const [form, setForm] = useState({
    ten_dan_toc: '',
    so_luong: '',
    year: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (isNaN(Number(form.so_luong))) errs.so_luong = 'Phải là số';
    if (isNaN(Number(form.year))) errs.year = 'Phải là số';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };


  useEffect(() => {
    if (editingItem) {
      setForm({
        ten_dan_toc: editingItem.ten_dan_toc,
        so_luong: editingItem.so_luong,
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
        await api.put(`/ethnic-groups/${editingItem.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingItem(null);
      } else {
        await api.post('/ethnic-groups', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      onSuccess();
      setForm({ ten_dan_toc: '', so_luong: '', year: '' });
    } catch (err) {
      console.error('Lỗi khi lưu dữ liệu:', err);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setForm({ ten_dan_toc: '', so_luong: '', year: '' });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexWrap="wrap"
      gap={2}
      mb={3}
    >
      <TextField
        label="Tên dân tộc"
        name="ten_dan_toc"
        value={form.ten_dan_toc}
        onChange={handleChange}
        required
      />
      <TextField
        error={!!errors.so_luong}
        helperText={errors.so_luong} 
        label="Số lượng"
        name="so_luong"
        value={form.so_luong}
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

export default EthnicGroupsForm;
