# Factory
![factory](https://github.com/Ren0503/factory-py-movie/blob/master/server/static/screenshots/header.png)

> Factory là trang web xem phim trực tuyến miễn phí, được xây dựng bằng Django và Nextjs.
- **server**: Chứa API cho trang web được tạo bằng Python, Django và SQLite (có thể chuyển thành PostgreSQL)
- **client** trang giao diện, được tạo với Next, Redux Toolkit và TailwindCSS.

## Tính năng

1. Đăng nhập/đăng ký
2. Xem tất cả phim
3. Tìm kiếm phim
4. Xem phim trực tuyến
5. Tìm kiếm diễn viên
6. Đánh giá phim

### Server

| Plugin | README |
| ------ | ------ |
| django | [plugins/django/README.md](https://github.com/django/django/blob/main/README.rstb/master/README.md) |
| django-cors-headers | [plugins/django-cors-headers/README.md](https://github.com/adamchainz/django-cors-headers) |
| django-storages | [plugins/django-storages/README.md](https://github.com/jschneier/django-storages/blob/master/README.rst)|
| djangorestframework | [plugins/djangorestframework/README.md](https://github.com/encode/django-rest-framework/blob/master/README.md) |
| djangorestframework-simplejwt | [plugins/djangorestframework-simplejwt/README.md](https://github.com/jazzband/djangorestframework-simplejwt/blob/master/README.rst) |
| Pillow | [plugins/Pillow/README.md](https://github.com/python-pillow/Pillow/blob/main/README.mdmd) |
| psycopg2 | [plugins/psycopg2/README.md](https://github.com/psycopg/psycopg2) |
| sqlparse | [plugins/sqlparse/README.md](https://github.com/andialbrecht/sqlparse/blob/master/README.rst) |

### Client

| Plugin | README |
| ------ | ------ |
| @redux/toolkit | [plugins/@redux/toolkit/README.md](https://github.com/reduxjs/redux-toolkit) |
| next | [plugins/next/README.md](https://github.com/vercel/next.js/blob/canary/packages/next/README.md) |
| postcss | [plugins/postcss/README.md](https://github.com/postcss/postcss/blob/main/README.md)|
| react | [plugins/react/README.md](https://github.com/facebook/react/blob/master/README.md) |
| react-redux | [plugins/react-redux/README.md](https://github.com/reduxjs/react-redux) |
| react-router-dom | [plugins/react-router-dom/README.md](https://github.com/ReactTraining/react-router/blob/master/README.md) |
| redux | [plugins/redux/README.md](https://github.com/reduxjs/redux)|
| tailwind | [plugins/tailwind/README.md](https://github.com/styled-components/styled-components/blob/main/README.md)|


## Core Structure
    code
      ├── package.json
      │
      ├── client
      │   ├── components
      │   ├── hooks
      │   ├── interfaces
      │   ├── hooks
      │   ├── pages
      │   ├── reducers
      │   ├── styles
      │   ├── utils
      │   ├── store.ts
      │   ├── tailwind.config.js
      │   ├── tsconfig.js
      │   └── package.json
      │
      ├── server 
      │   ├── core
      │   ├── server
      │   ├── static
      │   ├── .gitignore
      │   ├── db.sqlite3
      │   ├── manage.py
      │   └── requirements.txt
      ├── .gitignore
      └── README.md


### Screenshots

|                                        Home                                        |                                        Detail                                        |                                        Watch                                        |
| :--------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| ![](https://github.com/Ren0503/factory-py-movie/blob/master/server/static/screenshots/home.png) | ![](https://github.com/Ren0503/factory-py-movie/blob/master/server/static/screenshots/detail.png) | ![](https://github.com/Ren0503/factory-py-movie/blob/master/server/static/screenshots/watch.png) |

|                                        Actors                                        |                                        Detail                                        |                                        Review                                        |
| :--------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| ![](https://github.com/Ren0503/factory-py-movie/blob/master/server/static/screenshots/actors.png) | ![](https://github.com/Ren0503/factory-py-movie/blob/master/server/static/screenshots/actor_detail.png) | ![](https://github.com/Ren0503/factory-py-movie/blob/master/server/static/screenshots/review.png) |