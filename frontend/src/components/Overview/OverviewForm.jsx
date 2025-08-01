import { useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import api from '../../services/api';

const OverviewForm = ({ onSuccess, editingItem, setEditingItem }) => {
  const [form, setForm] = useState({
    dien_tich: '',
    dan_so: '',
    tong_so_dan_toc: '',
    ton_giao: '',
    year: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (isNaN(Number(form.dien_tich))) errs.dien_tich = 'Phải là số';
    if (isNaN(Number(form.dan_so))) errs.dan_so = 'Phải là số';
    if (isNaN(Number(form.tong_so_dan_toc))) errs.tong_so_dan_toc = 'Phải là số';
    if (isNaN(Number(form.ton_giao))) errs.ton_giao = 'Phải là số';
    if (isNaN(Number(form.year))) errs.year = 'Phải là số';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  useEffect(() => {
    if (editingItem) {
      setForm({
        dien_tich: editingItem.dien_tich,
        dan_so: editingItem.dan_so,
        tong_so_dan_toc: editingItem.tong_so_dan_toc,
        ton_giao: editingItem.ton_giao,
        year: editingItem.year
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
        // Cập nhật
        await api.put(`/overview/${editingItem.id}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEditingItem(null); // reset
      } else {
        // Thêm mới
        await api.post('/overview', form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      onSuccess();
      setForm({
        dien_tich: '',
        dan_so: '',
        tong_so_dan_toc: '',
        ton_giao: '',
        year: ''
      });
    } catch (err) {
      console.error('Lỗi khi lưu dữ liệu:', err);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setForm({
      dien_tich: '',
      dan_so: '',
      tong_so_dan_toc: '',
      ton_giao: '',
      year: ''
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" gap={2} flexWrap="wrap" mb={2}>
      <TextField 
        value={form.dien_tich}
        error={!!errors.dien_tich}
        helperText={errors.dien_tich} 
        name="dien_tich" label="Diện tích"  
        onChange={handleChange} required />
      <TextField 
        value={form.dan_so}
        error={!!errors.dan_so}
        helperText={errors.dan_so} 
        name="dan_so" label="Dân số" 
        onChange={handleChange} required />
      <TextField 
        value={form.tong_so_dan_toc}
        error={!!errors.tong_so_dan_toc}
        helperText={errors.tong_so_dan_toc} 
        name="tong_so_dan_toc" label="Tổng số dân tộc"  
        onChange={handleChange} required />
      <TextField 
        value={form.ton_giao}
        error={!!errors.ton_giao}
        helperText={errors.ton_giao} 
        name="ton_giao" label="Tôn giáo"  
        onChange={handleChange} required />
      <TextField 
        value={form.year}
        error={!!errors.year}
        helperText={errors.year} 
        name="year" label="Năm" 
        onChange={handleChange} required />
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

export default OverviewForm;
