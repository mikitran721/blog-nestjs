# cai dat mysql-docker

- su dung cau lenh `docker run --name mysql-server -e MYSQL_ROOT_PASSWORD=abc123 -p 33061:3306 -v "D:\DATABASE\MYSQL":/var/lib/mysql -d mysql` sau khi da pull mysql ve docker desktop
- su dung `tableplus` de ket noi truc quan voi mysql
- can cai 'typeorm' de tuong tac du lieu voi cau lenh `npm install --save @nestjs/typeorm typeorm mysql2`
