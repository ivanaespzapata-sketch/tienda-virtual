
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase.config';

export async function probarFirebase() {
  try {
    const resultado = await getDocs(
      collection(db, 'productos')
    );

    console.log('Firebase conectado correctamente');

    resultado.forEach(documento => {
      console.log(documento.id, documento.data());
    });

  } catch (error) {
    console.error('Error de Firebase:', error);
  }
}
