CREATE TABLE IF NOT EXISTS books (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    count_in_stock INTEGER NOT NULL DEFAULT 0,
    image VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    book_id VARCHAR(50) NOT NULL,
    book_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED',
    payment_method VARCHAR(50) NOT NULL DEFAULT 'CASH',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Insert dummy data for books
INSERT INTO books (id, name, author, description, price, count_in_stock, image)
VALUES
    ('1', 'El principito', 'Antoine de Saint-Exupéry', 'Un cuento poético que viene acompañado de ilustraciones hechas con acuarelas por el mismo Saint-Exupéry.', 45000, 10, '/images/libro1.jpg'),
    ('2', 'Cien años de soledad', 'Gabriel García Márquez', 'Obra maestra de la literatura hispanoamericana y universal, así como una de las obras más traducidas y leídas en español.', 65000, 5, '/images/libro2.jpg'),
    ('3', '1984', 'George Orwell', 'Novela política de ficción distópica, escrita por George Orwell entre 1947 y 1948 y publicada el 8 de junio de 1949.', 55000, 8, '/images/libro3.jpg')
ON CONFLICT (id) DO NOTHING;
