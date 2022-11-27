CREATE DATABASE TOKO;

CREATE TABLE product(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    stock INT NOT NULL,
    price INT NOT NULL,
    category_id INT REFERENCES category (id),
    transaksi_id INT REFERENCES transaksi (id)
);
CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

CREATE TABLE transaksi(
    id SERIAL PRIMARY KEY,
    adress VARCHAR NOT NULL,
    transaksi_detail_id INT REFERENCES transaksi_detail (id)
);

CREATE TABLE transaksi_detail(
    id SERIAL PRIMARY KEY,
    total INT NOT NULL,
    payment_id INT REFERENCES payment(id)
);

CREATE TABLE payment(
    id SERIAL PRIMARY KEY,
    amount INT NOT NULL
);

DROP TABLE product CASCADE;

SELECT * FROM category;

SELECT * FROM category WHERE id=1;

SELECT product.name,product.stock,product.price,category.name as category
FROM product
INNER JOIN category
ON product.category_id = category.id;

INSERT INTO category(id,name) VALUES(1,’kursi’);

INSERT INTO category(name) VALUES(’kursi’);

UPDATE category SET name ='furniture' WHERE id=1;

DELETE FROM category WHERE id=1;

INSERT INTO users (id, email, password, fullname, role) VALUES (1, 'rizki@gmail.com', 'rizki nasution','rizki1', 'postgres')

SELECT *FROM users;
SELECT *FROM category;
SELECT *FROM products;
SELECT * FROM transactions;
SELECT * FROM payment;
SELECT *FROM detail_transactions;

SELECT transactions.id, transactions.address, detail_transactions.total as total, detail_transactions.payment_id 
as payment_id FROM transactions 
INNER JOIN detail_transactions ON transactions.detail_transactions_id = detail_transactions.id;

SELECT *FROM transactions;

SELECT *FROM payment;

INSERT INTO products;

ALTER TABLE products
ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category (id); 

ALTER TABLE products
ADD CONSTRAINT fk_transactions FOREIGN KEY (transactions_id) REFERENCES transactions (id); 

ALTER TABLE deta
ADD CONSTRAINT fk_transactions FOREIGN KEY (transactions_id) REFERENCES transactions (id);

ALTER TABLE IF EXISTS public.users
    ADD COLUMN role text NOT NULL DEFAULT 'buyer',
    CHECK(role IN ('buyer', 'seller', 'admin'));
    
 ALTER TABLE products ALTER COLUMN category_id TYPE VARCHAR(225);
 
  ALTER TABLE products ALTER COLUMN transactions_id TYPE VARCHAR(225);
  
   ALTER TABLE transactions ALTER COLUMN id TYPE VARCHAR(225);
   
   ALTER TABLE detail_transactions ALTER COLUMN id TYPE VARCHAR(225);
   
    ALTER TABLE payment ALTER COLUMN id TYPE VARCHAR(225);

INSERT INTO payment(id, amount) VALUES('1', 100000), ('2', 250000), ('3', 40000), ('4', 50000);

INSERT INTO transactions(id, address, detail_transactions_id) VALUES(1, 'Jakarta', 1), (2, 'Bogor', 2), (3, 'Bandung', 3), (4, 'Medan', 4);
 
 
 CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    password VARCHAR NOT NULL,
    role TEXT NOT NULL DEFAULT 'buyer',
    CHECK(role IN ('buyer', 'seller', 'admin')),
    UNIQUE(email));
