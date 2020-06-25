import { Aporte } from './../interfaces/aporte';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { summaryFileName } from '@angular/compiler/src/aot/util';
import { MaxLengthValidator } from '@angular/forms';

// essa estrutura ficam os serviços do sistema

@Injectable({
  providedIn: 'root'
})
export class AporteService {
  private aportesCollection: AngularFirestoreCollection<Aporte>;
  public valorTotalAporte: number = 0;
  private vrCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) {
    this.aportesCollection = this.afs.collection<Aporte>('Aportes');
  //  this.inicializaValorTotal(this.valorTotalAporte);
  }

  getAportes() {
    return this.aportesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          this.valorTotalAporte = this.valorTotalAporte + data.valor;
          // console.log('getAportes => ' + id + ' ' + data);
          console.log(` Vr Aporte acumulado: ${this.valorTotalAporte}`);
          return { id, ...data};
        });
      })
    );
  }

  addAporte(aporte: Aporte) {
    return this.aportesCollection.add(aporte);
  }

  getAporte(id: string) {
    return this.aportesCollection.doc<Aporte>(id).valueChanges();
  }

  updateAporte(id: string, aporte: Aporte) {
    return this.aportesCollection.doc<Aporte>(id).update(aporte);
    // return this.aportesCollection.doc<Aporte>(id).set({valor: aporte.valor});
  }

  delAporte(id: string) {
    console.log(id);
    return this.aportesCollection.doc(id).delete();
  }
  inicializaValorTotal(valor: number) {
    this.valorTotalAporte = 0;
  }
  getvalorTotalAporte(){
    console.log(` getvalorTotalAporte ${this.valorTotalAporte}`);
    return this.valorTotalAporte;
  }
}
