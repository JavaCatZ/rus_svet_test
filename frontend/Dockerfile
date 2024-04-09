FROM nginx:1.23.1-alpine
COPY ./dist/ /usr/share/nginx/html 
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 9004
CMD ["nginx", "-g", "daemon off;"]