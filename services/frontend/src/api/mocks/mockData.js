const fallbackBooks = [
  {
    id: '1',
    name: 'Clean Architecture',
    author: 'Robert C. Martin',
    image:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80',
    description: 'Guia practica para disenar software mantenible y orientado a casos de uso.',
    countInStock: 12,
    price: 45,
  },
  {
    id: '2',
    name: 'Building Microservices',
    author: 'Sam Newman',
    image:
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=500&q=80',
    description: 'Patrones y decisiones para evolucionar sistemas monoliticos a microservicios.',
    countInStock: 8,
    price: 52,
  },
  {
    id: '3',
    name: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    image:
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=500&q=80',
    description: 'Fundamentos de datos distribuidos para aplicaciones cloud-native.',
    countInStock: 5,
    price: 60,
  },
];

const fallbackReviews = [
  {
    id: 'r1',
    bookId: '1',
    userId: 'u-demo',
    rating: 5,
    comment: 'Muy claro para separar responsabilidades por capa.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'r2',
    bookId: '2',
    userId: 'u-demo',
    rating: 4,
    comment: 'Excelente referencia para evoluciones graduales.',
    createdAt: new Date().toISOString(),
  },
];

const fallbackOrders = [];

const fallbackUser = {
  id: 'u-demo',
  name: 'Estudiante Demo',
  email: 'demo@bookstore.local',
  role: 'student',
};

export { fallbackBooks, fallbackOrders, fallbackReviews, fallbackUser };
