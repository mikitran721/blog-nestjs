# Cai dat admin-cp

- su dung template `themwagon` - bootstrap5 admin dashboard template
- them cai dat de reactjs nhan api `app.enableCors()`
- cai `yarn add axios`
- delay time tra ve api de test loading

```javascript
await new Promise((resolve) => setTimeout(resolve, 2000));
```

# delete multiple blogs

- su dung `ParseArrayPipe` de convert string-id `vd: 1,3,5`

# noi dung update

- the api getProfile, can config `staticfile` de frontend co the view avatar o `main.ts`;
- update - bo `upload` trong path of avatar khi luu vao db
- update lai path khi upload `thumbnail` post
- bo sung field `summary` trong post
- thay doi kieu 'longtext' cho description-post
- bo sung api upload image-CKEditor
- Quan ly user `Role Based access control` cho admin va user thuong.
- Can config tai `app.module.ts` de dung global cho `Auth.Guard` vs `RoleGuard`; de public Auth/Role thi `@SetMetadata('isPublic',true)` hoac `@SetMetadata('roles',['Admin'])` de set role cho 'admin'; dinh nghia lai `role.decorator` giam text khi set role.
