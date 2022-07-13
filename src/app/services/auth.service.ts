import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "@angular/fire/auth";
import {
  addDoc,
  Firestore,
  collection,
  onSnapshot,
  doc,
  setDoc,
  updateDoc
} from "@angular/fire/firestore"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: any = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : {} 

  constructor(private auth: Auth, private firestore: Firestore) { }

  signUpUser(userData: any, successCallBack: () => void, errorCallback: (error: any) => void) {
    createUserWithEmailAndPassword(this.auth, userData.email, userData.password).then(userCredentials => {
      const colRef = doc(this.firestore, 'users', userCredentials.user.uid)
      setDoc(colRef, { name: userData.name, email: userData.email,role:"user" }).then(() => {
        this.getUserProfile(userCredentials.user.uid, () => {
          successCallBack()
        })
      }).catch(err => {
        errorCallback(err)
        console.log(err.message)
      })
    }).catch(err => {
      errorCallback(err)
      console.log(err.message)
    })
  }

  signInUser(userData: any, successCallBack: () => void, errorCallback: (error: any) => void) {
    signInWithEmailAndPassword(this.auth, userData.email, userData.password).then(userCredentials => {
      this.getUserProfile(userCredentials.user.uid, () => {
        successCallBack()
      })
    }).catch(err => {
      errorCallback(err)
      console.log(err.message)
    })
  }

  getUserProfile(id: string, successCallBack: () => void) {
    onSnapshot(doc(this.firestore, "users", id), (doc) => {
      this.currentUser = { ...doc.data(), id: doc.id }
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
      successCallBack()
    });
  }

  updateUserProfile(updateData: { name: string, email: string, phone: number, address: string }, successCallBack: () => void) {
    const colRef = doc(this.firestore, 'users', this.currentUser.id)
    updateDoc(colRef, updateData).then(() => {
      successCallBack()
    })
  }

}
