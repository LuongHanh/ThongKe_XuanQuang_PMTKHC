import { useEffect, useState, useRef } from 'react';
import api from '../../services/api';
import {
  Table, TableHead, TableRow, TableCell, TableBody, IconButton, Paper
} from '@mui/material';
import DigitalTechnologyForm from './DigitalTechnologyForm';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const DigitalTechnologyTable = () => {
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [highlightId, setHighlightId] = useState(null); // dùng cho dòng đang sửa
  const [deletedId, setDeletedId] = useState(null); // dùng cho dòng đang bị xoá
  const topRef = useRef(null);

  const fetchData = async () => {
    const res = await api.get('/digital-technology');
    setData(res.data);
  };

  const handleDelete = async (id) => {
    setDeletedId(id);
    setTimeout(async () => {
      const confirmDelete = window.confirm('Bạn có chắc chắn muốn xoá mục này không?');
      if (!confirmDelete) {setDeletedId(null);return;}

      try {
        const token = sessionStorage.getItem('token');
        await api.delete(`/digital-technology/${id}`, {
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
      <DigitalTechnologyForm onSuccess={() => {
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
            <TableCell align="center">DV công TT</TableCell>
            <TableCell align="center">Đội CN số</TableCell>
            <TableCell align="center">Điện thoại</TableCell>
            <TableCell align="center">Internet</TableCell>
            <TableCell align="center">Người biết CNTT</TableCell>
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
              <TableCell align="center">{row.dich_vu_cong_tt}</TableCell>
              <TableCell align="center">{row.doi_cong_nghe_so}</TableCell>
              <TableCell align="center">{row.ty_le_dien_thoai}</TableCell>
              <TableCell align="center">{row.ty_le_internet}</TableCell>
              <TableCell align="center">{row.so_nguoi_biet_cong_nghe_so}</TableCell>
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

export default DigitalTechnologyTable;
