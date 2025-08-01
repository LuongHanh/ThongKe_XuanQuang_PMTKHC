// middleware/verifyToken.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: 'Token không được cung cấp' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // thêm thông tin user vào req
    next();
  } catch (err) {
    res.status(403).json({ message: 'Token không hợp lệ' });
  }
};
