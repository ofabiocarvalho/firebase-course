import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;
    pictureUrl$: Observable<string>;

    constructor(private afAuth:AngularFireAuth){

    }

    ngOnInit(){
      this.afAuth.authState.subscribe(user => console.log(user));

      this.isLoggedIn$ = this.afAuth.authState.pipe(map(user => !!user));

      this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loogedIn => !loogedIn));

      this.pictureUrl$ = this.afAuth.authState.pipe(map(user => user ? user.photoURL : null));
    }

    logout() {
      this.afAuth.auth.signOut();
    }

}
