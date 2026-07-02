# =====================================================================
# GIAI ĐOẠN 1: BẬT BẾP VÀ NẤU NƯỚNG (Biên dịch mã nguồn từ file gốc)
# =====================================================================

# 1. Tải một môi trường NodeJS bản siêu nhẹ (alpine) về làm nền
FROM node:20-alpine AS build-stage

# 2. Tạo một thư mục làm việc tên là /app bên trong Docker
WORKDIR /app

# 3. Copy các file quản lý thư viện (package.json) từ máy bạn vào Docker trước
COPY package*.json ./

# 4. Chạy lệnh cài đặt tất cả các thư viện (node_modules) bên trong môi trường Docker
RUN npm ci

# 5. Copy toàn bộ mã nguồn còn lại của dự án từ máy bạn vào trong Docker
COPY . .

# 6. Chạy lệnh biên dịch để nén code React thành các file tĩnh (nằm trong thư mục /app/dist)
RUN npm run build


# =====================================================================
# GIAI ĐOẠN 2: CHỈ LẤY THÀNH PHẨM VÀ BÀY LÊN ĐĨA (Phân phối file tĩnh)
# =====================================================================

# 7. Tải một môi trường Web Server Nginx bản siêu nhẹ về
FROM nginx:alpine

# 8. BƯỚC QUAN TRỌNG NHẤT: Bốc duy nhất thư mục "dist" đã build xong ở Giai đoạn 1 
# ném vào thư mục hiển thị mặc định của Nginx. Toàn bộ thư mục code gốc và node_modules 
# siêu nặng ở Giai đoạn 1 sẽ bị vứt bỏ hoàn toàn.
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 9. Khai báo cho Docker biết container này sẽ mở cổng mạng số 80
EXPOSE 80

# 10. Lệnh khởi chạy Web Server Nginx để bắt đầu phục vụ người dùng truy cập web
CMD ["nginx", "-g", "daemon off;"]