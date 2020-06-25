import { Custo } from './../interfaces/Custo';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { summaryFileName } from '@angular/compiler/src/aot/util';
import { MaxLengthValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustoService {
  private custosCollection: AngularFirestoreCollection<Custo>;

  constructor(private afs: AngularFirestore) {
    this.custosCollection = this.afs.collection<Custo>('Custos');
  }

  getCustos(){
    return this.custosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          console.log('getCustos => ' + id + ' ' + data);
          return { id, ...data };
        });
      })
    );
  }

  addCusto(custo: Custo){
    return this.custosCollection.add(custo);
  }

  getCusto(id: string){
    return this.custosCollection.doc<Custo>(id).valueChanges();
  }

  updateCusto(id: string, custo: Custo){
    return this.custosCollection.doc<Custo>(id).update(custo);
    // return this.CustosCollection.doc<Custo>(id).set({valor: Custo.valor});
  }

  delCusto(id: string){
    console.log(id);
    return this.custosCollection.doc(id).delete();
  }
  somaCustos(custo: Custo){
  // em construção
  }
}
