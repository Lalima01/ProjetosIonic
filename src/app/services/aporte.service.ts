import { Aporte } from './../interfaces/aporte';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AporteService {
  private aportesCollection: AngularFirestoreCollection<Aporte>;

  constructor(private afs: AngularFirestore) {
    this.aportesCollection = this.afs.collection<Aporte>('Aportes');
  }

  getAportes(){
    return this.aportesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          console.log('getAportes => ' + id + ' ' + data);
          return { id, ...data };
        });
      })
    );
  }

  addAporte(aporte: Aporte){
    return this.aportesCollection.add(aporte);
  }

  getAporte(id: string){
    return this.aportesCollection.doc<Aporte>(id).valueChanges();
  }

  updateAporte(id: string, aporte: Aporte){
    return this.aportesCollection.doc<Aporte>(id).update(aporte);
    // return this.aportesCollection.doc<Aporte>(id).set({valor: aporte.valor});
  }

  delAporte(id: string){
    console.log(id);
    return this.aportesCollection.doc(id).delete();
  }
  somaAportes(valor: number){
    // returnar a soma dos valores incluídos nos Aportes
  }
}
