import Database from 'better-sqlite3'

const db = new Database('./data/database.sqlite');

db.prepare(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING UNIQUE)`).run();
db.prepare(`CREATE TABLE IF NOT EXISTS blogs (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, title STRING, category STRING, content STRING, created DATE, lastModified DATE, FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE )`).run();


export const getUsers = () => db
    .prepare('SELECT * FROM users').all();

export const saveUser = (name) => db
    .prepare('INSERT INTO users (name) VALUES (?)').run(name);

export const updateUser = (id, name) => db
    .prepare('UPDATE users SET name = ? WHERE id = ?').run(name, id);

export const deleteUser = (id) => db
    .prepare('DELETE FROM users WHERE id =?').run(id);

export const getBlogs = () => db
    .prepare('SELECT * FROM blogs').all();

export const saveBlog = (userId, title,category,content,created, lastModified) => db
    .prepare('INSERT INTO blogs (userId, title,category,content,created, lastModified) VALUES (?,?,?,?,?,?)').run(userId, title,category,content,created, lastModified);

export const updateBlog = (id, userId, title,category,content,created, lastModified) => db
    .prepare('UPDATE blogs SET userId = ?, title = ?,category = ?,content = ?,created = ?, lastModified = ? WHERE id = ?').run(userId, title, category, content, created, lastModified, id);

export const deleteBlog = (id) => db
    .prepare('DELETE FROM blogs WHERE id =?').run(id);


const users = [
    { name: 'Jozsi'},
    { name: 'Erzsi'},
    { name: 'Dani'}
];

const d = new Date();
const dateString = `${d.getFullYear()}.${d.getMonth()}.${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

const blogs = [
    {userId : 1, title : "nev1", category: "kategoria1", content: "content1", created : `${dateString}`, lastModified:`${dateString}`},
    {userId : 1, title : "nev2", category: "kategoria2", content: "content2", created : `${dateString}`, lastModified:`${dateString}`},
    {userId : 2, title : "nev3", category: "kategoria3", content: "content3", created : `${dateString}`, lastModified:`${dateString}`},
    {userId : 2, title : "nev4", category: "kategoria4", content: "content4", created : `${dateString}`, lastModified:`${dateString}`},
    {userId : 3, title : "nev5", category: "kategoria5", content: "content5", created : `${dateString}`, lastModified:`${dateString}`},
    {userId : 3, title : "nev6", category: "kategoria6", content: "content6", created : `${dateString}`, lastModified:`${dateString}`}
];

if(getBlogs().length == 0 && getUsers() == 0)
{
for(const user of users) saveUser(user.name, user.age);
for(const blog of blogs) saveBlog(blog.userId, blog.title, blog.category, blog.content, blog.created, blog.lastModified);
}