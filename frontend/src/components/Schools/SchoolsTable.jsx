// SchoolTable.jsx
import { useEffect, useState, useRef } from 'react';
import api from '../../services/api';
import {
  Table, TableHead, TableBody, TableRow, TableCell, IconButton, Paper
} from '@mui/material';
import SchoolsForm from './SchoolsForm';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const SchoolsTable = () => {
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [highlightId, setHighlightId] = useState(null); // dùng cho dòng đang sửa
  const [deletedId, setDeletedId] = useState(null); // dùng cho dòng đang bị xoá
  const topRef = useRef(null);

  const fetchData = async () => {
    const res = await api.get('/schools');
    setData(res.data);
  };

  const handleDelete = async (id) => {
    setDeletedId(id);
    setTimeout(async () => {
      const confirmDelete = window.confirm('Bạn có chắc chắn muốn xoá mục này không?');
      if (!confirmDelete) {setDeletedId(null);return;}

      try {
        const token = sessionStorage.getItem('token');
        await api.delete(`/schools/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingItem(null); 
        setHighlightId(null);
        fetchData();
      } catch (error) {
        console.error('Lỗi khi xoá:', error);
        alert('Đã xảy ra lỗi khi xoá!');
      }
      setDeletedId(null);
    }, 100); 
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item);
    setHighlightId(item.id);
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <SchoolsForm onSuccess={() => {
        fetchData();
        setEditingItem(null);
        setHighlightId(null); 
      }}
      editingItem={editingItem}
      setEditingItem={(item) => {
        setEditingItem(item);
        if (!item) setHighlightId(null);
      }}/>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">STT</TableCell>
            <TableCell align="center">Tên trường</TableCell>
            <TableCell align="center">Cấp trường</TableCell>
            <TableCell align="center">Số HS</TableCell>
            <TableCell align="center">Chuẩn QG</TableCell>
            <TableCell align="center">Năm</TableCell>
            <TableCell align="center">Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={row.id} sx={{
              backgroundColor: row.id === highlightId
                ? 'rgba(255, 255, 0, 0.3)' : // vàng
                row.id === deletedId
                ? 'rgba(255, 0, 0, 0.1)' : 'transparent'
            }}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{row.ten_truong}</TableCell>
              <TableCell align="center">{row.cap_truong}</TableCell>
              <TableCell align="center">{row.so_luong_hoc_sinh}</TableCell>
              <TableCell align="center">{row.dat_chuan_qg}</TableCell>
              <TableCell align="center">{row.year}</TableCell>
              <TableCell align="center">
                <IconButton color="primary" onClick={() => handleEdit(row)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(row.id)} sx={{ ml: 3 }}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default SchoolsTable;
