# 第一个阶段:拉取node镜像来打包React项目
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY tsconfig.json ./
COPY public public/
COPY src src/
RUN yarn run build

# 第二个阶段:创建并运行Nginx
# alpine 基于 linux内核版本
FROM nginx:alpine
COPY --from=build /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
