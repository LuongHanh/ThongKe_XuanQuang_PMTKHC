import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import api from '../services/api';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

// 🌐 Chuyển key => Tiếng Việt
const fieldLabels = {
  dien_tich: 'Diện tích (km²)',
  dan_so: 'Dân số',
  tong_so_dan_toc: 'Tổng số dân tộc',
  ton_giao: 'Tôn giáo',
  ten_dan_toc: 'Tên dân tộc',
  so_luong: 'Số lượng',
  so_ho_ngheo: 'Số hộ nghèo',
  so_ho_can_ngheo: 'Số hộ cận nghèo',
  thu_nhap_binh_quan: 'Thu nhập bình quân',
  so_thon: 'Số thôn',
  so_ho_kinh_doanh_nho_le: 'Hộ kinh doanh nhỏ lẻ',
  ten_thon: 'Tên thôn',
  so_htx: 'Số HTX',
  quy_mo: 'Quy mô',
  linh_vuc_hoat_dong: 'Lĩnh vực hoạt động',
  mo_hinh_kinh_te_hieu_qua: 'Mô hình KT hiệu quả',
  so_tram_y_te: 'Trạm y tế',
  so_phong_kham_tu_nhan: 'Phòng khám tư',
  so_luong_can_bo_y_te: 'Cán bộ y tế',
  ty_le_bhyt: 'Tỷ lệ BHYT (%)',
  tong_so_truong_hoc: 'Tổng trường học',
  tong_so_hoc_sinh: 'Tổng học sinh',
  truong_chuan_qg: 'Trường chuẩn QG',
  ten_truong: 'Tên trường',
  cap_truong: 'Cấp trường',
  so_luong_hoc_sinh: 'Số học sinh',
  dat_chuan_qg: 'Đạt chuẩn QG',
  duong_gtnt_cung_hoa: 'Đường GTNT cứng hoá (%)',
  nha_kien_co: 'Nhà kiên cố (%)',
  ty_le_dien: 'Tỷ lệ điện (%)',
  ty_le_nuoc_sach: 'Tỷ lệ nước sạch (%)',
  dich_vu_cong_tt: 'DV công trực tuyến',
  doi_cong_nghe_so: 'Đội công nghệ số',
  ty_le_dien_thoai: 'Tỷ lệ điện thoại (%)',
  ty_le_internet: 'Tỷ lệ internet (%)',
  so_nguoi_biet_cong_nghe_so: 'Người biết CNTT'
};

const ChartExporter = ({ endpoint, label, year }) => {
  const chartRef = useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [res1, res2] = await Promise.all([
          api.get(`/${endpoint}/${year - 1}`),
          api.get(`/${endpoint}/${year}`)
        ]);
        setData({ prev: res1.data[0], curr: res2.data[0] });
      } catch (err) {
        console.error(`Lỗi biểu đồ ${endpoint}:`, err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint, year]);

  const handleDownload = async () => {
    const canvas = await html2canvas(chartRef.current);
    const link = document.createElement('a');
    link.download = `${label}_${year}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  if (loading || !data) return <CircularProgress sx={{ m: 2 }} />;

  const keys = Object.keys({ ...data.prev, ...data.curr }).filter(
    k =>
      !['id', 'year', 'updated_by'].includes(k) &&
      !isNaN(Number(data.curr?.[k])) &&
      !isNaN(Number(data.prev?.[k]))
  );

  const labels = keys.map(k => fieldLabels[k] || k.replace(/_/g, ' '));

  const chartData = {
    labels,
    datasets: [
      {
        label: `${year - 1}`,
        data: keys.map(k => Number(data.prev?.[k] || 0)),
        backgroundColor: 'rgba(255, 99, 132, 0.6)'
      },
      {
        label: `${year}`,
        data: keys.map(k => Number(data.curr?.[k] || 0)),
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      datalabels: {
        anchor: 'end',
        align: 'start',
        color: '#000',
        font: { size: 14 },
        formatter: Math.round
      }
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 0,
          font: (context) => {
            const label = labels[context.index] || '';
            return {
              style: label.length > 25 ? 'italic' : 'normal',
              weight: 'bold',
              size: 14
            };
          }
        }
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Box sx={{ mt: 4, width: 'calc(100vw - 144px)', px: 2, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        {label}
      </Typography>
      <Button onClick={handleDownload} size="small" sx={{ textDecoration: 'underline', fontStyle: 'italic'}}>
        Tải Biểu đồ
      </Button>
      <Box  sx={{ display: 'flex', justifyContent: 'center' , width: 'calc(100vw - 176px)', mt: 2 }}>
        <Box
          ref={chartRef}
          sx={{
            minWidth: 'auto',
            width: `${Math.max(keys.length * 130, 1000)}px`,
            height: 350,
          }}
        >
          <Bar data={chartData} options={options} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChartExporter;
