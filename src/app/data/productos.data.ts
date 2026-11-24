export interface ProductoAurelle {
  id: number;
  sku: string;
  title: string;
  category: 'Anillos' | 'Aretes' | 'Charms y Dijes' | 'Collares' | 'Pulseras';
  description: string;
  price: number;
  stock: number;
  image: string;
  medidas: string;
}

export const PRODUCTOS_AURELLE: ProductoAurelle[] = [
  { id: 1, sku: 'AUR-ANI-001', title: 'Anillo Banda Infinita', category: 'Anillos', description: 'Anillo de perfil delgado y cómodo para uso continuo.', price: 690, stock: 18, image: 'assets/productos/anillo-1.png', medidas: '5 g / Ajustable' },
  { id: 2, sku: 'AUR-ANI-002', title: 'Anillo Halo Radiante', category: 'Anillos', description: 'Detalle central rodeado de micro-detalles luminosos.', price: 940, stock: 9, image: 'assets/productos/anillo-2.png', medidas: '7 g / Talla 7' },
  { id: 3, sku: 'AUR-ANI-003', title: 'Anillo Doble Aro', category: 'Anillos', description: 'Diseño moderno de doble línea con acabado pulido.', price: 720, stock: 13, image: 'assets/productos/anillo-3.png', medidas: '6 g / Talla 6' },
  { id: 4, sku: 'AUR-ANI-004', title: 'Anillo Solitario Serena', category: 'Anillos', description: 'Piedra central clásica sobre banda fina y elegante.', price: 1120, stock: 7, image: 'assets/productos/anillo-4.png', medidas: '6 g / Talla 7' },
  { id: 5, sku: 'AUR-ANI-005', title: 'Anillo Ondas Doradas', category: 'Anillos', description: 'Silueta orgánica con textura suave para combinar.', price: 610, stock: 16, image: 'assets/productos/anillo-5.png', medidas: '5 g / Ajustable' },

  { id: 6, sku: 'AUR-ARE-006', title: 'Arracadas Huggie Clásicas', category: 'Aretes', description: 'Arracadas pequeñas de cierre práctico y cómodo.', price: 640, stock: 20, image: 'assets/productos/aretes-1.png', medidas: '6 g / 1.4 cm' },
  { id: 7, sku: 'AUR-ARE-007', title: 'Broqueles Punto de Luz', category: 'Aretes', description: 'Broqueles discretos con piedra central brillante.', price: 520, stock: 25, image: 'assets/productos/aretes-2.png', medidas: '4 g / 0.6 cm' },
  { id: 8, sku: 'AUR-ARE-008', title: 'Arracadas Trenzadas', category: 'Aretes', description: 'Arracadas de textura trenzada con brillo uniforme.', price: 780, stock: 14, image: 'assets/productos/aretes-3.png', medidas: '9 g / 2.2 cm' },
  { id: 9, sku: 'AUR-ARE-009', title: 'Aretes Gota Elegante', category: 'Aretes', description: 'Diseño alargado con caída ligera para eventos o diario.', price: 860, stock: 11, image: 'assets/productos/aretes-4.png', medidas: '8 g / 3.1 cm' },
  { id: 10, sku: 'AUR-ARE-010', title: 'Broqueles Flor Satinada', category: 'Aretes', description: 'Broqueles con motivo floral y acabado satinado delicado.', price: 590, stock: 16, image: 'assets/productos/aretes-5.png', medidas: '5 g / 1.0 cm' },

  { id: 11, sku: 'AUR-CHM-011', title: 'Charm Estrella Fugaz', category: 'Charms y Dijes', description: 'Dije compacto con forma de estrella para pulsera o collar.', price: 450, stock: 22, image: 'assets/productos/charm-1.png', medidas: '3 g / 1.2 cm' },
  { id: 12, sku: 'AUR-CHM-012', title: 'Charm Corazón Brillante', category: 'Charms y Dijes', description: 'Detalle en forma de corazón con acabado luminoso.', price: 490, stock: 19, image: 'assets/productos/charm-2.png', medidas: '4 g / 1.3 cm' },
  { id: 13, sku: 'AUR-CHM-013', title: 'Charm Luna Creciente', category: 'Charms y Dijes', description: 'Dije de media luna con trazo delicado y elegante.', price: 530, stock: 15, image: 'assets/productos/charm-3.png', medidas: '4 g / 1.5 cm' },
  { id: 14, sku: 'AUR-CHM-014', title: 'Charm Trébol de Suerte', category: 'Charms y Dijes', description: 'Dije simbólico ideal para obsequio o uso diario.', price: 560, stock: 17, image: 'assets/productos/charm-4.png', medidas: '4 g / 1.4 cm' },
  { id: 15, sku: 'AUR-CHM-015', title: 'Charm Perla Colgante', category: 'Charms y Dijes', description: 'Pequeña perla colgante con argolla de sujeción segura.', price: 610, stock: 12, image: 'assets/productos/charm-5.png', medidas: '5 g / 1.6 cm' },

  { id: 16, sku: 'AUR-COL-016', title: 'Collar Solitaire Dorado', category: 'Collares', description: 'Collar fino con dije central brillante para uso diario o regalo.', price: 890, stock: 15, image: 'assets/productos/collar-1.png', medidas: '8 g / 45 cm' },
  { id: 17, sku: 'AUR-COL-017', title: 'Gargantilla Ondas de Luz', category: 'Collares', description: 'Gargantilla de acabado liso y estilizado con caída suave.', price: 750, stock: 12, image: 'assets/productos/collar-2.png', medidas: '10 g / 42 cm' },
  { id: 18, sku: 'AUR-COL-018', title: 'Collar Corazón Entrelazado', category: 'Collares', description: 'Dije doble con acabado pulido ideal para ocasiones especiales.', price: 980, stock: 10, image: 'assets/productos/collar-3.png', medidas: '9 g / 45 cm' },
  { id: 19, sku: 'AUR-COL-019', title: 'Collar Perla Clásica', category: 'Collares', description: 'Cadena fina con detalle tipo perla de brillo elegante.', price: 820, stock: 18, image: 'assets/productos/collar-4.png', medidas: '11 g / 45 cm' },
  { id: 20, sku: 'AUR-COL-020', title: 'Collar Medallón Aurelle', category: 'Collares', description: 'Medallón circular con borde texturizado y presencia clásica.', price: 1150, stock: 8, image: 'assets/productos/collar-5.png', medidas: '14 g / 50 cm' },

  { id: 21, sku: 'AUR-PUL-021', title: 'Pulsera Esclava Rígida', category: 'Pulseras', description: 'Pulsera rígida de línea limpia con cierre discreto.', price: 1050, stock: 10, image: 'assets/productos/pulsera-1.png', medidas: '16 g / 6 cm diam.' },
  { id: 22, sku: 'AUR-PUL-022', title: 'Pulsera Cadena Eslabón', category: 'Pulseras', description: 'Pulsera de eslabones articulados con broche seguro.', price: 890, stock: 14, image: 'assets/productos/pulsera-2.png', medidas: '12 g / 18 cm' },
  { id: 23, sku: 'AUR-PUL-023', title: 'Pulsera Hilo Brillante', category: 'Pulseras', description: 'Diseño ligero y delicado con ajuste cómodo en muñeca.', price: 670, stock: 16, image: 'assets/productos/pulsera-3.png', medidas: '6 g / 17.5 cm' },
  { id: 24, sku: 'AUR-PUL-024', title: 'Pulsera Perlas Aurelle', category: 'Pulseras', description: 'Combinación de perlas sutiles con broche clásico.', price: 920, stock: 11, image: 'assets/productos/pulsera-4.png', medidas: '11 g / 18 cm' },
  { id: 25, sku: 'AUR-PUL-025', title: 'Pulsera Rígida Texturizada', category: 'Pulseras', description: 'Brazalete con acabado texturizado para lucir sola o acompañada.', price: 1190, stock: 9, image: 'assets/productos/pulsera-5.png', medidas: '17 g / 6.2 cm diam.' }
];
