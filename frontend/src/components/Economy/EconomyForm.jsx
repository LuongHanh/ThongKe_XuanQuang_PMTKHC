import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Box, TextField, Button } from '@mui/material';

const EconomyForm = ({ onSuccess, editingItem, setEditingItem }) => {
  const [form, setForm] = useState({
    so_ho_ngheo: '',
    so_ho_can_ngheo: '',
    thu_nhap_binh_quan: '',
    so_thon: '',
    so_ho_kinh_doanh_nho_le: '',
    year: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (isNaN(Number(form.so_ho_ngheo))) errs.so_ho_ngheo = 'Phải là số';
    if (isNaN(Number(form.so_ho_can_ngheo))) errs.so_ho_can_ngheo = 'Phải là số';
    if (isNaN(Number(form.thu_nhap_binh_quan))) errs.thu_nhap_binh_quan = 'Phải là số';
    if (isNaN(Number(form.so_thon))) errs.so_thon = 'Phải là số';
    if (isNaN(Number(form.so_ho_kinh_doanh_nho_le))) errs.so_ho_kinh_doanh_nho_le = 'Phải là số';
    if (isNaN(Number(form.year))) errs.year = 'Phải là số';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };


  useEffect(() => {
    if (editingItem) {
      setForm({
        so_ho_ngheo: editingItem.so_ho_ngheo,
        so_ho_can_ngheo: editingItem.so_ho_can_ngheo,
        thu_nhap_binh_quan: editingItem.thu_nhap_binh_quan,
        so_thon: editingItem.so_thon,
        so_ho_kinh_doanh_nho_le: editingItem.so_ho_kinh_doanh_nho_le,
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
        await api.put(`/economy/${editingItem.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingItem(null);
      } else {
        await api.post('/economy', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setForm({
        so_ho_ngheo: '',
        so_ho_can_ngheo: '',
        thu_nhap_binh_quan: '',
        so_thon: '',
        so_ho_kinh_doanh_nho_le: '',
        year: '',
      });
      onSuccess();
    } catch (err) {
      console.error('Lỗi khi lưu dữ liệu:', err);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setForm({
      so_ho_ngheo: '',
      so_ho_can_ngheo: '',
      thu_nhap_binh_quan: '',
      so_thon: '',
      so_ho_kinh_doanh_nho_le: '',
      year: '',
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexWrap="wrap" gap={2} mb={3}>
      <TextField 
        error={!!errors.so_ho_ngheo} helperText={errors.so_ho_ngheo} 
        label="Số hộ nghèo" name="so_ho_ngheo" value={form.so_ho_ngheo} onChange={handleChange} required />
      <TextField 
        error={!!errors.so_ho_can_ngheo} helperText={errors.so_ho_can_ngheo} 
        label="Số hộ cận nghèo" name="so_ho_can_ngheo" value={form.so_ho_can_ngheo} onChange={handleChange} required />
      <TextField 
        error={!!errors.thu_nhap_binh_quan} helperText={errors.thu_nhap_binh_quan} 
        label="Thu nhập bình quân" name="thu_nhap_binh_quan" value={form.thu_nhap_binh_quan} onChange={handleChange} required />
      <TextField 
        error={!!errors.so_thon} helperText={errors.so_thon} 
        label="Số thôn" name="so_thon" value={form.so_thon} onChange={handleChange} required />
      <TextField 
        error={!!errors.so_ho_kinh_doanh_nho_le} helperText={errors.so_ho_kinh_doanh_nho_le} 
        label="Số hộ kinh doanh nhỏ lẻ" name="so_ho_kinh_doanh_nho_le" value={form.so_ho_kinh_doanh_nho_le} onChange={handleChange} required />
      <TextField 
        error={!!errors.year} helperText={errors.year} 
        label="Năm" name="year" value={form.year} onChange={handleChange} required />

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

export default EconomyForm;
