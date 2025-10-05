// MongoDB 初始化脚本
db = db.getSiblingDB('admin');

// 创建管理员用户
db.createUser({
  user: 'admin',
  pwd: 'adminpassword',
  roles: [{ role: 'root', db: 'admin' }]
});
print('✅ Admin user created');

// 创建应用用户
db.createUser({
  user: 'mernuser',
  pwd: 'mernpassword',
  roles: [{ role: 'readWrite', db: 'mern-auth' }]
});
print('✅ Application user created');

// 切换到应用数据库
db = db.getSiblingDB('mern-auth');

// 创建集合
db.createCollection('users');
db.createCollection('sessions');
print('✅ Collections created');

print('🎉 MongoDB initialization completed successfully');
