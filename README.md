# cai dat mysql-docker

- su dung cau lenh `docker run --name mysql-server -e MYSQL_ROOT_PASSWORD=abc123 -p 33061:3306 -v "D:\DATABASE\MYSQL":/var/lib/mysql -d mysql` sau khi da pull mysql ve docker desktop
- su dung `tableplus` de ket noi truc quan voi mysql
- can cai 'typeorm' de tuong tac du lieu voi cau lenh `npm install --save @nestjs/typeorm typeorm mysql2`

# cau lenh voi nestjs

- su dung `nest g mo | co |s <name>` de tao tu dong controller, module, services
- bo sung 1 so script nhu sau:

```javascript
"typeorm":"npm run build && npx typeorm -d dist/db/data.source.ts",
    "migration:generate":"npm run typeorm -- migration:generate",
    "migration:run":"npm run typeorm -- migration:run",
    "migration:revert":"npm run typeorm -- migration:revert"
```

- sau khi update/tao `entity` co the run migrantion voi cau lenh:
  `yarn run migration:generate db/migrations/create_user_table`

- sau khi tao xong migration:generate thi co the su dung `migration:run` de tao ra table; & co the share migration voi dev# de tao table
- neu su dung `yarn run migration:revert` typeorm se huy migrantion vua moi thuc hien gan nhat

# ve file .dto.ts

- dinh nghia kieu du lieu ma client post len server

# cac pakage cai them

- su dung `bcrypt` de ma hoa password cai dat `npm i bcrypt`
- su dung JWT tao access&refresh-token `npm i @nestjs/jwt`
- su dung `class-validator` de validate `yarn add class-validator` (can define o dto.ts & khai bao sd o controller)
- cai dong thoi `class-transformer` de su dung validate
- cai dat `yarn add @nestjs/config`
- cai swagger `yarn add @nestjs/swagger` - api document
- cai Multer `yarn add --dev @types/multer`
- cai dat `yarn add path` ho tro lay extension tu file

# noi dung

- xay dung api dang ky nguoi dung
- api login & refresh-token co validate = class-validator & su dung `config` .env
  - khi access-token het han se kiem tra refresh-token de tao ra 1 access-token & refresh-token moi.
- Build: auth Guards
- Improve get list user: pagination; Search, Filter.
- cong cu Swagger API: su dung tuong tu postman tren browser
- upload file voi Multer, upload len folder 'publics', luu vao DB, validate
- Relationship 1-n; Create API with Post
- Get post data; Update, delete API with Post; validate
- Category module cho post, filter post by category, list all category api

# CRUD API:

- de sd entity can import vao module
- chua xu ly khi update ma them 1 fields du lieu khong thuoc table
- Feature `UseInterceptors` cua NestJs de: cho phep can thiep vao luong xu ly truoc khi vao controller - thuc hien cac tac vu `xac thuc, ghi log, xu ly file`
  - sd folder `helper\config.ts` de luu tru cau hinh file upload

# time hoc

`17:32` clip 3
