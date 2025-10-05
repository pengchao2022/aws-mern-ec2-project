db = db.getSiblingDB('mern-auth');

// 创建应用数据库用户
db.createUser({
  user: 'mernuser',
  pwd: 'mernpassword',
  roles: [
    {
      role: 'readWrite',
      db: 'mern-auth'
    }
  ]
});

// 创建测试集合
db.createCollection('users');
db.createCollection('sessions');

// 插入测试数据（可选）
db.users.insertOne({
  username: 'testuser',
  email: 'test@example.com',
  password: '$2a$10$examplehashedpassword',
  createdAt: new Date(),
  updatedAt: new Date()
});

print('MongoDB initialized successfully with mern-auth database');