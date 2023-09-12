# cai dat mysql-docker

- su dung cau lenh `docker run --name mysql-server -e MYSQL_ROOT_PASSWORD=abc123 -p 33061:3306 -v "D:\DATABASE\MYSQL":/var/lib/mysql -d mysql` sau khi da pull mysql ve docker desktop
- su dung `tableplus` de ket noi truc quan voi mysql
- can cai 'typeorm' de tuong tac du lieu voi cau lenh `npm install --save @nestjs/typeorm typeorm mysql2`

# cau lenh voi nestjs

- su dung `nest g co|mo|s <name>` de tao tu dong controller, module, services
- bo sung 1 so script nhu sau:

```javascript
"typeorm":"npm run build && npx typeorm -d dist/db/data.source.ts",
    "migration:generate":"npm run typeorm -- migration:generate",
    "migration:run":"npm run typeorm -- migration:run",
    "migration:revert":"npm run typeorm -- migration:revert"
```

- tao migrantion voi cau lenh

```javascript
yarn run migration:generate db/migrations/create_user_table
```

- sau khi tao xong migration:generate thi co the su dung `migration:run` de tao ra table; & co the share migration voi dev# de tao table
- neu su dung `yarn run migration:revert` typeorm se huy migrantion vua moi thuc hien gan nhat
