# Wedding Invitation - Static site
FROM nginx:alpine

# Xóa trang mặc định của nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy toàn bộ file tĩnh vào thư mục phục vụ
COPY index.html /usr/share/nginx/html/
COPY styles /usr/share/nginx/html/styles
COPY scripts /usr/share/nginx/html/scripts
COPY assets /usr/share/nginx/html/assets

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
