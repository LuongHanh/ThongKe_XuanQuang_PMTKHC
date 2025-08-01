import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Token có dạng: Bearer eyJhbGciOiJIUzI1NiIsInR5...
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Không có token, truy cập bị từ chối' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Lưu user đã xác thực vào req
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token không hợp lệ hoặc hết hạn' });
  }
};
