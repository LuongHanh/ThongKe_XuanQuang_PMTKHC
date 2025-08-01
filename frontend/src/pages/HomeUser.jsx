import { useEffect, useState } from 'react';
import {
  Container, Typography, Box, Table, TableHead, TableRow,
  TableCell, TableBody, Paper, Divider
} from '@mui/material';
import api from '../services/api'; // Adjust the import path as necessary

const HomeUser = () => {
  const [overview, setOverview] = useState([]);
  const [ethnic, setEthnic] = useState([]);
  const [economy, setEconomy] = useState([]);
  const [villages, setVillages] = useState([]);
  const [eduHealth, setEduHealth] = useState([]);
  const [schools, setSchools] = useState([]);
  const [infra, setInfra] = useState([]);
  const [digital, setDigital] = useState([]);

  useEffect(() => {
    const yearRes = new Date().getFullYear();
    const fetchData = async () => {
      try {
        const [o, e, v, eh, sc, inf, dt, et] = await Promise.all([
          api.get(`/overview/${yearRes}`),
          api.get(`/economy/${yearRes}`),
          api.get(`/villages/${yearRes}`),
          api.get(`/education-healthcare/${yearRes}`),
          api.get(`/schools/${yearRes}`),
          api.get(`/infrastructure/${yearRes}`),
          api.get(`/digital-technology/${yearRes}`),
          api.get(`/ethnic-groups/${yearRes}`)
        ]);
        
        setOverview(o.data);
        setEconomy(e.data);
        setVillages(v.data);
        setEduHealth(eh.data);
        setSchools(sc.data);
        setInfra(inf.data);
        setDigital(dt.data);
        setEthnic(et.data);
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu:', err);
      }
    };
    fetchData();
  }, []);

  const Section = ({ title, headers, data, renderRow }) => (
    <Box mb={4}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>{headers.map((h) => <TableCell key={h}>{h}</TableCell>)}</TableRow>
        </TableHead>
        <TableBody>
          {data.map(renderRow)}
        </TableBody>
      </Table>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{mt: 7 , backgroundImage: 'url(/backgroundHome.png)', backgroundPosition: 'center', backgroundSize: 'cover', minWidth: 'calc(100vw - 144px)'}}>
      <Typography variant="h4" gutterBottom align="center" sx={{ pt: 4, fontWeight: 'bold' }}>
        📊 Số liệu thống kê công khai – Xã Xuân Quang
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Paper sx={{ p: 2 , backgroundColor: 'transparent', backdropFilter: 'blur(5px)'}}>

        <Section fontWeight="bold"
          title="I. Chỉ số tổng quan"
          headers={['Diện tích', 'Dân số', 'Tổng số dân tộc', 'Tôn giáo', 'Năm']}
          data={overview}
          renderRow={(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.dien_tich}</TableCell>
              <TableCell>{item.dan_so}</TableCell>
              <TableCell>{item.tong_so_dan_toc}</TableCell>
              <TableCell>{item.ton_giao}</TableCell>
              <TableCell>{item.year}</TableCell>
            </TableRow>
          )}
        />

        <Section
          title="II. Dân số theo dân tộc"
          headers={['Tên dân tộc', 'Số lượng', 'Năm']}
          data={ethnic}
          renderRow={(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.ten_dan_toc}</TableCell>
              <TableCell>{item.so_luong}</TableCell>
              <TableCell>{item.year}</TableCell>
            </TableRow>
          )}
        />

        <Section
          title="III. Kinh tế"
          headers={['Hộ nghèo', 'Cận nghèo', 'Thu nhập bình quân', 'Số thôn', 'Hộ KD nhỏ lẻ', 'Năm']}
          data={economy}
          renderRow={(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.so_ho_ngheo}</TableCell>
              <TableCell>{item.so_ho_can_ngheo}</TableCell>
              <TableCell>{item.thu_nhap_binh_quan}</TableCell>
              <TableCell>{item.so_thon}</TableCell>
              <TableCell>{item.so_ho_kinh_doanh_nho_le}</TableCell>
              <TableCell>{item.year}</TableCell>
            </TableRow>
          )}
        />

        <Section
          title="IV. Thôn và HTX"
          headers={['Tên thôn', 'Số HTX', 'Quy mô', 'Lĩnh vực', 'Mô hình hiệu quả', 'Năm']}
          data={villages}
          renderRow={(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.ten_thon}</TableCell>
              <TableCell>{item.so_htx}</TableCell>
              <TableCell>{item.quy_mo}</TableCell>
              <TableCell>{item.linh_vuc_hoat_dong}</TableCell>
              <TableCell>{item.mo_hinh_kinh_te_hieu_qua}</TableCell>
              <TableCell>{item.year}</TableCell>
            </TableRow>
          )}
        />

        <Section
          title="V. Y tế – Giáo dục"
          headers={['Trạm y tế', 'Phòng khám tư', 'Cán bộ y tế', 'Tỷ lệ BHYT', 'Tổng trường', 'HS', 'Trường chuẩn', 'Năm']}
          data={eduHealth}
          renderRow={(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.so_tram_y_te}</TableCell>
              <TableCell>{item.so_phong_kham_tu_nhan}</TableCell>
              <TableCell>{item.so_luong_can_bo_y_te}</TableCell>
              <TableCell>{item.ty_le_bhyt}</TableCell>
              <TableCell>{item.tong_so_truong_hoc}</TableCell>
              <TableCell>{item.tong_so_hoc_sinh}</TableCell>
              <TableCell>{item.truong_chuan_qg}</TableCell>
              <TableCell>{item.year}</TableCell>
            </TableRow>
          )}
        />

        <Section
          title="VI. Trường học"
          headers={['Tên trường', 'Cấp trường', 'Học sinh', 'Chuẩn QG', 'Năm']}
          data={schools}
          renderRow={(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.ten_truong}</TableCell>
              <TableCell>{item.cap_truong}</TableCell>
              <TableCell>{item.so_luong_hoc_sinh}</TableCell>
              <TableCell>{item.dat_chuan_qg}</TableCell>
              <TableCell>{item.year}</TableCell>
            </TableRow>
          )}
        />

        <Section
          title="VII. Cơ sở hạ tầng"
          headers={['Đường GTNT cứng hóa', 'Nhà kiên cố', 'Tỷ lệ điện', 'Tỷ lệ nước sạch', 'Năm']}
          data={infra}
          renderRow={(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.duong_gtnt_cung_hoa}</TableCell>
              <TableCell>{item.nha_kien_co}</TableCell>
              <TableCell>{item.ty_le_dien}</TableCell>
              <TableCell>{item.ty_le_nuoc_sach}</TableCell>
              <TableCell>{item.year}</TableCell>
            </TableRow>
          )}
        />

        <Section
          title="VIII. Ứng dụng công nghệ số"
          headers={['DV công trực tuyến', 'Đổi công nghệ', 'Tỷ lệ ĐT', 'Tỷ lệ Internet', 'Người biết CNTT', 'Năm']}
          data={digital}
          renderRow={(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.dich_vu_cong_tt}</TableCell>
              <TableCell>{item.doi_cong_nghe_so}</TableCell>
              <TableCell>{item.ty_le_dien_thoai}</TableCell>
              <TableCell>{item.ty_le_internet}</TableCell>
              <TableCell>{item.so_nguoi_biet_cong_nghe_so}</TableCell>
              <TableCell>{item.year}</TableCell>
            </TableRow>
          )}
        />

      </Paper>
    </Container>
  );
};

export default HomeUser;
