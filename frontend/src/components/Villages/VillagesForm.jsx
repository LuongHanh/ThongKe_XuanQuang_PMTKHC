import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Box, TextField, Button } from '@mui/material';

const VillagesForm = ({ onSuccess, editingItem, setEditingItem }) => {
  const [form, setForm] = useState({
    ten_thon: '',
    so_htx: '',
    quy_mo: '',
    linh_vuc_hoat_dong: '',
    mo_hinh_kinh_te_hieu_qua: '',
    year: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (isNaN(Number(form.so_htx))) errs.so_htx = 'Phải là số';
    if (isNaN(Number(form.quy_mo))) errs.quy_mo = 'Phải là số';
    if (isNaN(Number(form.year))) errs.year = 'Phải là số';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  useEffect(() => {
    if (editingItem) {
      setForm({
        ten_thon: editingItem.ten_thon,
        so_htx: editingItem.so_htx,
        quy_mo: editingItem.quy_mo,
        linh_vuc_hoat_dong: editingItem.linh_vuc_hoat_dong,
        mo_hinh_kinh_te_hieu_qua: editingItem.mo_hinh_kinh_te_hieu_qua,
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
        await api.put(`/villages/${editingItem.id}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEditingItem(null);
      } else {
        await api.post('/villages', form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      onSuccess();
      setForm({
        ten_thon: '',
        so_htx: '',
        quy_mo: '',
        linh_vuc_hoat_dong: '',
        mo_hinh_kinh_te_hieu_qua: '',
        year: ''
      });
    } catch (err) {
      console.error('Lỗi khi gửi dữ liệu:', err);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setForm({
      ten_thon: '',
      so_htx: '',
      quy_mo: '',
      linh_vuc_hoat_dong: '',
      mo_hinh_kinh_te_hieu_qua: '',
      year: ''
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexWrap="wrap" gap={2} mb={2}>
      <TextField 
        name="ten_thon" label="Tên thôn" value={form.ten_thon} onChange={handleChange} required />
      <TextField 
        error={!!errors.so_htx} helperText={errors.so_htx}  
        name="so_htx" label="Số HTX" value={form.so_htx} onChange={handleChange} required />
      <TextField 
        error={!!errors.quy_mo} helperText={errors.quy_mo}  
        name="quy_mo" label="Quy mô" value={form.quy_mo} onChange={handleChange} required />
      <TextField 
        name="linh_vuc_hoat_dong" label="Lĩnh vực hoạt động" value={form.linh_vuc_hoat_dong} onChange={handleChange} required />
      <TextField 
        name="mo_hinh_kinh_te_hieu_qua" label="Mô hình KT hiệu quả" value={form.mo_hinh_kinh_te_hieu_qua} onChange={handleChange} required />
      <TextField 
        error={!!errors.year} helperText={errors.year}  
        name="year" label="Năm" value={form.year} onChange={handleChange} required />
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

export default VillagesForm;
