import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Box, TextField, Button } from '@mui/material';

const InfrastructureForm = ({ onSuccess, editingItem, setEditingItem }) => {
  const [form, setForm] = useState({
    duong_gtnt_cung_hoa: '',
    nha_kien_co: '',
    ty_le_dien: '',
    ty_le_nuoc_sach: '',
    year: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (isNaN(Number(form.duong_gtnt_cung_hoa))) errs.duong_gtnt_cung_hoa = 'Phải là số';
    if (isNaN(Number(form.nha_kien_co))) errs.nha_kien_co = 'Phải là số';
    if (isNaN(Number(form.ty_le_dien))) errs.ty_le_dien = 'Phải là số';
    if (isNaN(Number(form.ty_le_nuoc_sach))) errs.ty_le_nuoc_sach = 'Phải là số';
    if (isNaN(Number(form.year))) errs.year = 'Phải là số';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };


  useEffect(() => {
    if (editingItem) {
      setForm({
        duong_gtnt_cung_hoa: editingItem.duong_gtnt_cung_hoa,
        nha_kien_co: editingItem.nha_kien_co,
        ty_le_dien: editingItem.ty_le_dien,
        ty_le_nuoc_sach: editingItem.ty_le_nuoc_sach,
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
        await api.put(`/infrastructure/${editingItem.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingItem(null);
      } else {
        await api.post('/infrastructure', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      onSuccess();
      setForm({
        duong_gtnt_cung_hoa: '',
        nha_kien_co: '',
        ty_le_dien: '',
        ty_le_nuoc_sach: '',
        year: '',
      });
    } catch (err) {
      console.error('Lỗi khi lưu dữ liệu:', err);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setForm({
      duong_gtnt_cung_hoa: '',
      nha_kien_co: '',
      ty_le_dien: '',
      ty_le_nuoc_sach: '',
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
        error={!!errors.duong_gtnt_cung_hoa}
        helperText={errors.duong_gtnt_cung_hoa} 
        label="Đường GTNT cứng hoá"
        name="duong_gtnt_cung_hoa"
        value={form.duong_gtnt_cung_hoa}
        onChange={handleChange}
        required
      />
      <TextField
        error={!!errors.nha_kien_co}
        helperText={errors.nha_kien_co} 
        label="Nhà kiên cố"
        name="nha_kien_co"
        value={form.nha_kien_co}
        onChange={handleChange}
        required
      />
      <TextField
        error={!!errors.ty_le_dien}
        helperText={errors.ty_le_dien} 
        label="Tỷ lệ điện (%)"
        name="ty_le_dien"
        value={form.ty_le_dien}
        onChange={handleChange}
        required
      />
      <TextField
        error={!!errors.ty_le_nuoc_sach}
        helperText={errors.ty_le_nuoc_sach} 
        label="Tỷ lệ nước sạch (%)"
        name="ty_le_nuoc_sach"
        value={form.ty_le_nuoc_sach}
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

export default InfrastructureForm;
