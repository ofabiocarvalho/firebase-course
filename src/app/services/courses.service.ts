import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private db: AngularFirestore) {
    
   }

   loadAllCourses(): Observable<Course[]> {
      return this.db.collection('courses',
      ref => ref.orderBy('seqNo')
                .startAfter(0).endAt(5)
      )
      .snapshotChanges()
      .pipe(map(snaps => {
          console.log(snaps);
          return snaps.map(snap => {
              return <Course>{
                id: snap.payload.doc.id,
                ...snap.payload.doc.data()
              }
          });
        }), 
        first()
      );
  }
}
