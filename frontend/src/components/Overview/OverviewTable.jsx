import { useEffect, useState, useRef } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../../services/api';
import OverviewForm from './OverviewForm';

const OverviewTable = () => {
  const [data, setData] = useState([]); 
  const [editingItem, setEditingItem] = useState(null);
  const [highlightId, setHighlightId] = useState(null); // dùng cho dòng đang sửa
  const [deletedId, setDeletedId] = useState(null); // dùng cho dòng đang bị xoá
  const topRef = useRef(null);

  const fetchData = async () => {
    try {
      const res = await api.get(`/overview`);
      setData(res.data);
    } catch (err) {
      console.error('Lỗi khi tải dữ liệu:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setDeletedId(id);
    setTimeout(async () => {
      const confirmDelete = window.confirm('Bạn có chắc chắn muốn xoá mục này không?');
      if (!confirmDelete) {setDeletedId(null);return;}

      try {
        const token = sessionStorage.getItem('token');
        await api.delete(`/overview/${id}`, {
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

  const handleEdit = (item) => {
    setEditingItem(item);
    setHighlightId(item.id);
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };


  return (
    <Paper sx={{ p: 2 }}>
      <OverviewForm onSuccess={() => {
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
            <TableCell align="center">Diện tích</TableCell>
            <TableCell align="center">Dân số</TableCell>
            <TableCell align="center">Tổng dân tộc</TableCell>
            <TableCell align="center">Tôn giáo</TableCell>
            <TableCell align="center">Năm</TableCell>
            <TableCell align="center">Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={row.id} sx={{
              backgroundColor: row.id === highlightId
                ? 'rgba(255, 255, 0, 0.3)' : // vàng
                row.id === deletedId
                ? 'rgba(255, 0, 0, 0.1)' : 'transparent'
            }}>
              <TableCell align="center">{idx + 1}</TableCell>
              <TableCell align="center">{row.dien_tich}</TableCell>
              <TableCell align="center">{row.dan_so}</TableCell>
              <TableCell align="center">{row.tong_so_dan_toc}</TableCell>
              <TableCell align="center">{row.ton_giao}</TableCell>
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

export default OverviewTable;
