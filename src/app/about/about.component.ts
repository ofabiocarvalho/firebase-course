import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Course } from '../model/course';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { Transaction } from '@firebase/firestore-types';
import { async } from '@angular/core/testing';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
  

  }

  save(){
     
    const rxjsCourseRef = this.db.doc('courses/3gtkNWUL0h3IPq163caU').ref;
    const typescriptCourseRef = this.db.doc('courses/7nCBF996a66MGkm4AdSd').ref;

    const batch = this.db.firestore.batch();

    batch.update(rxjsCourseRef, {titles: {description: 'Rxjs and Reactive Patterns Angular Architecture Course'}}); // Rxjs and Reactive Patterns Angular Architecture Course

    batch.update(typescriptCourseRef, {titles: {description: 'The Complete Typescript Course'}}); // The Complete Typescript Course

    const batch$ = of(batch.commit());

    batch$.subscribe();

  }

  async runTransaction() {

    const newCounter = await this.db.firestore.runTransaction(async transaction => {
      console.log('Running transaction...');

      const courseRef = this.db.doc('courses/G4TzkdJhOoSSso4Z5Q0A').ref; //Serverless Angular with Firebase Course
      
      const snap = await transaction.get(courseRef);

      const course = <Course>  snap.data();

      const lessonsCount = course.lessonsCount + 1;

      transaction.update(courseRef, {lessonsCount});

      return lessonsCount;
    });

    console.log('result lessons count = ', newCounter);

  }

}
