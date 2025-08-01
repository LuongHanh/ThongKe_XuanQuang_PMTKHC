import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Box, TextField, Button } from '@mui/material';

const EducationHealthcareForm = ({ onSuccess, editingItem, setEditingItem }) => {
  const [form, setForm] = useState({
    so_tram_y_te: '',
    so_phong_kham_tu_nhan: '',
    so_luong_can_bo_y_te: '',
    ty_le_bhyt: '',
    tong_so_truong_hoc: '',
    tong_so_hoc_sinh: '',
    truong_chuan_qg: '',
    year: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (isNaN(Number(form.so_tram_y_te))) errs.so_tram_y_te = 'Phải là số';
    if (isNaN(Number(form.so_phong_kham_tu_nhan))) errs.so_phong_kham_tu_nhan = 'Phải là số';
    if (isNaN(Number(form.so_luong_can_bo_y_te))) errs.so_luong_can_bo_y_te = 'Phải là số';
    if (isNaN(Number(form.ty_le_bhyt))) errs.ty_le_bhyt = 'Phải là số';
    if (isNaN(Number(form.tong_so_truong_hoc))) errs.tong_so_truong_hoc = 'Phải là số';
    if (isNaN(Number(form.tong_so_hoc_sinh))) errs.tong_so_hoc_sinh = 'Phải là số';
    if (isNaN(Number(form.truong_chuan_qg))) errs.truong_chuan_qg = 'Phải là số';
    if (isNaN(Number(form.year))) errs.year = 'Phải là số';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };


  useEffect(() => {
    if (editingItem) {
      setForm({
        so_tram_y_te: editingItem.so_tram_y_te,
        so_phong_kham_tu_nhan: editingItem.so_phong_kham_tu_nhan,
        so_luong_can_bo_y_te: editingItem.so_luong_can_bo_y_te,
        ty_le_bhyt: editingItem.ty_le_bhyt,
        tong_so_truong_hoc: editingItem.tong_so_truong_hoc,
        tong_so_hoc_sinh: editingItem.tong_so_hoc_sinh,
        truong_chuan_qg: editingItem.truong_chuan_qg,
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
        await api.put(`/education-healthcare/${editingItem.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingItem(null);
      } else {
        await api.post('/education-healthcare', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      onSuccess();
      setForm({
        so_tram_y_te: '',
        so_phong_kham_tu_nhan: '',
        so_luong_can_bo_y_te: '',
        ty_le_bhyt: '',
        tong_so_truong_hoc: '',
        tong_so_hoc_sinh: '',
        truong_chuan_qg: '',
        year: '',
      });
    } catch (err) {
      console.error('Lỗi khi lưu dữ liệu:', err);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setForm({
      so_tram_y_te: '',
      so_phong_kham_tu_nhan: '',
      so_luong_can_bo_y_te: '',
      ty_le_bhyt: '',
      tong_so_truong_hoc: '',
      tong_so_hoc_sinh: '',
      truong_chuan_qg: '',
      year: '',
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexWrap="wrap" gap={2} mb={3}>
      <TextField 
        error={!!errors.so_tram_y_te} helperText={errors.so_tram_y_te} 
        label="Trạm y tế" name="so_tram_y_te" value={form.so_tram_y_te} onChange={handleChange} required />
      <TextField 
        error={!!errors.so_phong_kham_tu_nhan} helperText={errors.so_phong_kham_tu_nhan} 
        label="Phòng khám tư" name="so_phong_kham_tu_nhan" value={form.so_phong_kham_tu_nhan} onChange={handleChange} required />
      <TextField 
        error={!!errors.so_luong_can_bo_y_te} helperText={errors.so_luong_can_bo_y_te} 
        label="CBYT" name="so_luong_can_bo_y_te" value={form.so_luong_can_bo_y_te} onChange={handleChange} required />
      <TextField 
        error={!!errors.ty_le_bhyt} helperText={errors.ty_le_bhyt} 
        label="% BHYT" name="ty_le_bhyt" value={form.ty_le_bhyt} onChange={handleChange} required />
      <TextField 
        error={!!errors.tong_so_truong_hoc} helperText={errors.tong_so_truong_hoc} 
        label="Tổng trường học" name="tong_so_truong_hoc" value={form.tong_so_truong_hoc} onChange={handleChange} required />
      <TextField 
        error={!!errors.tong_so_hoc_sinh} helperText={errors.tong_so_hoc_sinh} 
        label="Tổng học sinh" name="tong_so_hoc_sinh" value={form.tong_so_hoc_sinh} onChange={handleChange} required />
      <TextField 
        error={!!errors.truong_chuan_qg} helperText={errors.truong_chuan_qg} 
        label="Trường đạt chuẩn" name="truong_chuan_qg" value={form.truong_chuan_qg} onChange={handleChange} required />
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

export default EducationHealthcareForm;
