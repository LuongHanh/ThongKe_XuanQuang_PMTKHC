import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Box, TextField, Button } from '@mui/material';

const DigitalTechnologyForm = ({ onSuccess, editingItem, setEditingItem }) => {
  const [form, setForm] = useState({
    dich_vu_cong_tt: '',
    doi_cong_nghe_so: '',
    ty_le_dien_thoai: '',
    ty_le_internet: '',
    so_nguoi_biet_cong_nghe_so: '',
    year: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (isNaN(Number(form.dich_vu_cong_tt))) errs.dich_vu_cong_tt = 'Phải là số';
    if (isNaN(Number(form.doi_cong_nghe_so))) errs.doi_cong_nghe_so = 'Phải là số';
    if (isNaN(Number(form.ty_le_dien_thoai))) errs.ty_le_dien_thoai = 'Phải là số';
    if (isNaN(Number(form.ty_le_internet))) errs.ty_le_internet = 'Phải là số';
    if (isNaN(Number(form.so_nguoi_biet_cong_nghe_so))) errs.so_nguoi_biet_cong_nghe_so = 'Phải là số';
    if (isNaN(Number(form.year))) errs.year = 'Phải là số';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };


  useEffect(() => {
    if (editingItem) {
      setForm({
        dich_vu_cong_tt: editingItem.dich_vu_cong_tt,
        doi_cong_nghe_so: editingItem.doi_cong_nghe_so,
        ty_le_dien_thoai: editingItem.ty_le_dien_thoai,
        ty_le_internet: editingItem.ty_le_internet,
        so_nguoi_biet_cong_nghe_so: editingItem.so_nguoi_biet_cong_nghe_so,
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
        await api.put(`/digital-technology/${editingItem.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingItem(null);
      } else {
        await api.post('/digital-technology', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setForm({
        dich_vu_cong_tt: '',
        doi_cong_nghe_so: '',
        ty_le_dien_thoai: '',
        ty_le_internet: '',
        so_nguoi_biet_cong_nghe_so: '',
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
      dich_vu_cong_tt: '',
      doi_cong_nghe_so: '',
      ty_le_dien_thoai: '',
      ty_le_internet: '',
      so_nguoi_biet_cong_nghe_so: '',
      year: '',
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexWrap="wrap" gap={2} mb={3}>
      <TextField 
        error={!!errors.dich_vu_cong_tt} helperText={errors.dich_vu_cong_tt} 
        label="DV công trực tuyến" name="dich_vu_cong_tt" value={form.dich_vu_cong_tt} onChange={handleChange} required />
      <TextField 
        error={!!errors.doi_cong_nghe_so} helperText={errors.doi_cong_nghe_so} 
        label="Đội công nghệ số" name="doi_cong_nghe_so" value={form.doi_cong_nghe_so} onChange={handleChange} required />
      <TextField 
        error={!!errors.ty_le_dien_thoai} helperText={errors.ty_le_dien_thoai} 
        label="Tỷ lệ điện thoại" name="ty_le_dien_thoai" value={form.ty_le_dien_thoai} onChange={handleChange} required />
      <TextField 
        error={!!errors.ty_le_internet} helperText={errors.ty_le_internet} 
        label="Tỷ lệ internet" name="ty_le_internet" value={form.ty_le_internet} onChange={handleChange} required />
      <TextField 
        error={!!errors.so_nguoi_biet_cong_nghe_so} helperText={errors.so_nguoi_biet_cong_nghe_so} 
        label="Số người biết CNTT" name="so_nguoi_biet_cong_nghe_so" value={form.so_nguoi_biet_cong_nghe_so} onChange={handleChange} required />
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

export default DigitalTechnologyForm;
