import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse  } from "@angular/common/http";
import { throwError, Observable, Subject } from "rxjs";
import { tap, catchError, mergeMap, switchMap } from "rxjs/operators";
import { AllModulesData } from "src/assets/all-modules-data/all-modules-data";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
// import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AllModulesService {
  path
  // path=environment.apiEndpoint;
  private eventSource: EventSource;
  private sseSubject: Subject<MessageEvent>;
  
  groups = {
    active: "",
    total: ["general", "video responsive survey", "500rs", "warehouse"],
  };
  members = {
    active: "Mike Litorus",
    total: [
      { name: "John Doe", count: 3 },
      { name: "Richard Miles", count: 0 },
      { name: "John Smith", count: 7 },
      { name: "Mike Litorus", count: 9 },
    ],
  };
  // Api Methods for All modules

  public apiurl;
  public loginData=localStorage.getItem('LoginData');
  
  // Headers Setup
  headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .set("Accept", "multipart/form-data")
    .set("Authorization" , this.loginData)
    .set( 'Cache-Control', 'no-cache')
    .set( 'X-Requested-With', 'XMLHttpRequest');
  httpOptions = {
    
    headers: this.headers,
  };
  data: any;

  constructor(private http: HttpClient, public router: Router) {
    this.sseSubject = new Subject<any>();
  }
 
  public getMenuData(): Observable<any> {
    return this.http.get<any>('assets/config.json');
  }
  

  // Handling Errors
  private handleError(error: any) {
    return throwError(error);
  }
  get(type): Observable<any> {
    this.path=localStorage.getItem('baseurl')
        console.log(this.path);
        console.log(type);
        this.apiurl = `${this.path}`+'/'+`${type}`;
        console.log(this.apiurl);
        this.loginData = localStorage.getItem('LoginData');
        const httpOptions = {
          headers: new HttpHeaders({
            "Authorization": this.loginData,
            'Content-Type': 'application/json'
          }),
          withCredentials: true,
          observe: 'response' as 'response'
        };
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'withCredentials': 'true',
          "Authorization": this.loginData
        }).set('X-Requested-With', 'XMLHttpRequest');
  
        return this.http.get<any>(this.apiurl, { headers: headers }).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              Swal.fire({
                title: 'Token Expired',
                text: "Please login",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
              }).then((result) => {
                if (result.isConfirmed) {
                  localStorage.clear();
                  this.router.navigate(['']);
                }
              });
            } else {
              return throwError(error);
            }
          })
        );
      // })
    // );
  }
  
 
  //  get(type):Observable<any> {
  //   // return this.http.get('/assets/config.json').pipe(
  //   //    mergeMap((data: any) => {
  //   //      this.path = data.baseURL;

  //     // this.getMenuData().subscribe((res)=>{
  //     // console.log(res.baseURL)
  //     // this.path = res.baseURL;
  //     return this.http.get('../assets/config.json').pipe(switchMap((res:any)=>{
  //       console.log(res)
  //       this.path=res.baseURL
  //        console.log(this.path);
  //        console.log(type);
  //        this.apiurl = this.path + `${type}`;
  //        console.log(this.apiurl);
  //        this.loginData = localStorage.getItem('LoginData');
  //        const httpOptions = {
  //          headers: new HttpHeaders({ "Authorization": this.loginData, 'Content-Type': 'application/json' }),

  //          withCredentials: true,
  //          observe: 'response' as 'response'
  //        };
  //        let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'withCredentials': 'true', "Authorization": this.loginData }).set('X-Requested-With', 'XMLHttpRequest');
  //        return this.http
  //          .get<any>(this.apiurl, { headers: headers })
  //          .pipe(catchError((error: HttpErrorResponse) => {
  //            if (error.status === 401) {
  //              Swal.fire({
  //                title: 'Token Expired',
  //                text: "Please login",
  //                icon: 'warning',
  //                confirmButtonColor: '#3085d6',
  //                }).then((result) => {
  //                if (result.isConfirmed) {
  //                  localStorage.clear();
  //                  this.router.navigate(['']);
  //                }
  //                });
  //                } else {
  //                return throwError(error);
  //                }
  //          }));
  //      }));
  // }

  getPlainRes(type): Observable<Text> {
    this.path=localStorage.getItem('baseurl')
        console.log(this.path);
        console.log(type);
        this.apiurl = `${this.path}`+'/'+`${type}`;
    this.loginData = localStorage.getItem('LoginData');
    const httpOptions = {
      headers: new HttpHeaders({ "Authorization": this.loginData,'Content-Type': 'application/text' }),
         
      withCredentials: true, 
      observe: 'response' as 'response'
    }; 
    let headers = new HttpHeaders({  'Content-Type': 'application/text', 'withCredentials': 'true' ,"Authorization": this.loginData}) .set( 'X-Requested-With', 'XMLHttpRequest');
    console.log({headers:headers})
    return this.http
      .get<any>(this.apiurl, {headers:headers})
      .pipe( catchError((error: HttpErrorResponse)=>{
        if (error.status === 401) {
          Swal.fire({
            title: 'Token Expired',
            text: "Please login",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.clear();
              this.router.navigate([''])
            }
          })
        } else {
         
          return throwError(error);
        }
      }));
  
  }

  get1(type): Observable<any> {
    this.path=localStorage.getItem('baseurl')
        console.log(this.path);
        console.log(type);
        this.apiurl = `${this.path}`+'/'+`${type}`;
    this.loginData = localStorage.getItem('LoginData');
    let headers = new HttpHeaders({  'withCredentials': 'true' ,"Authorization": this.loginData});
    return this.http
      .get<any>(this.apiurl, {headers:headers})
      .pipe( catchError((error: HttpErrorResponse)=>{
        if (error.status === 401) {
          Swal.fire({
            title: 'Token Expired',
            text: "Please login",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.clear();
              this.router.navigate([''])
            }
          })
        } else {
         
          return throwError(error);
        }
      }));
  }


  
  errorMsg: string;
  add(user: any, type): Observable<any> {
    this.path=localStorage.getItem('baseurl')
    console.log(this.path);
    console.log(type);
    this.apiurl = `${this.path}`+'/'+`${type}`;
   this.loginData = localStorage.getItem('LoginData');
   var headers = new HttpHeaders().set("Authorization" , this.loginData);
   let httpOptions = {
     
     headers: headers,
   };
   return this.http
     .post<any>(this.apiurl, user, httpOptions).pipe( catchError((error: HttpErrorResponse)=>{
      if (error.status === 401) {
        Swal.fire({
          title: 'Token Expired',
          text: "Please login",
          icon: 'warning',
          confirmButtonColor: '#3085d6',
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.clear();
            this.router.navigate([''])
          }
        })
      } else {
       
        return throwError(error);
      }
    }));

}
// initSseAndPost( type,user: any): Observable<any> {
//   this.apiurl = this.path+`${type}`;
//  this.loginData = localStorage.getItem('LoginData');
//  const httpOptions = {
//   headers: new HttpHeaders({ "Authorization": this.loginData,'withCredentials': 'true' }),
// }; 
// let headers = this.headers
// console.log({headers:headers})
//  return this.http
//    .post<any>(this.apiurl, user,{headers:headers}).pipe( catchError((error: HttpErrorResponse)=>{
//     if (error.status === 401) {
//       Swal.fire({
//         title: 'Token Expired',
//         text: "Please login",
//         icon: 'warning',
//         confirmButtonColor: '#3085d6',
//       }).then((result) => {
//         if (result.isConfirmed) {
//           localStorage.clear();
//           this.router.navigate([''])
//         }
//       })
//     } 
//     else {
//       console.log(1111111)
//       this.initSse(this.apiurl).subscribe(
        
//         event => {
//           console.log(event)
//           this.sseSubject.next(event);
//         },
//         error => {
//                     console.error('Error in SSE connection:');
//                   }
//                 );
  
  
//               error => {
//                 console.error('Error making POST request:');
//               }
          
//             return this.sseSubject.asObservable();

      
//             }
//           }))
// }
   
// initSseAndPost(url: string, postData): Observable<string> {
//   this.apiurl = this.path+`${url}`;
//   this.loginData = localStorage.getItem('LoginData');
//   var headers = new HttpHeaders().set("Authorization" , this.loginData);
//   let httpOptions = {
    
//     headers: headers,
//   };
//   this.http.post<string>(this.apiurl, postData).pipe( catchError((error:HttpErrorResponse)=>{
//       this.initSse(this.apiurl).subscribe(
//         event => {
//           console.log(event)
//           this.sseSubject.next(event);
//         },
//         error => {
//           console.error('Error in SSE connection:', error);
//         }
//       );
//     })),
//     error => {
//       console.error('Error making POST request:', error);
//     }

//   return this.sseSubject.asObservable();
// }

// getEventSource(url: string,user:any): EventSource {
//   return new EventSource(url);
// }

// getMessageStream(url: string,user:any): Observable<any> {
//   return new Observable<any>(observer => {
//     const eventSource = this.getEventSource(url,user);
//     eventSource.onmessage = event => {
//       observer.next(event.data);
//     };
//     eventSource.onerror = error => {
//       observer.error(error);
//     };
//     return () => {
//       eventSource.close();
//     };
//   });
// }



// private initSse(url: string): Observable<any> {
//   this.eventSource = new EventSource(url);
//   this.eventSource.onmessage = (event) => {
//     console.log(event)
//     this.sseSubject.next(event);
//   };
//   this.eventSource.onerror = (error) => {
//     this.sseSubject.error(error);
//   };
//   return new Observable<any>(observer => {
//     return () => {
//       this.eventSource.close();
//       observer.complete();
//     };
//   });
// }

postData(url,data: any) {

  let botMessage = ''
  this.path=localStorage.getItem('baseurl')
  console.log(this.path);
  console.log(url);
  this.apiurl = `${this.path}`+'/'+`${url}`;
  // this.apiurl = this.path+`${url}`;
  this.loginData = localStorage.getItem('LoginData'); 
  this.chatStream(url,data).subscribe({
    next: (text) => {
      //console.log(text)

      botMessage += text
      console.log(botMessage)
    },
    complete: () => {
      console.log("Doness")
    },
    error: () => {
      console.log("error")
    }
  });

  return botMessage;
}

private emitter = new Subject<any>();

  emitValue(value: any): void {
    this.emitter.next(value);
    console.log(this.emitValue)
  }

  getEmitter(): Observable<any> {
    return this.emitter.asObservable();
  }




log( type:any, user: any): Observable<any> {
 
 return this.http
   .post<any>(type, user).pipe( catchError((error: HttpErrorResponse)=>{
   
      return throwError(error);
    
  }));
  };



private getServerErrorMessage(error: HttpErrorResponse): string {
switch (error.status) {
case 404: {
  return `Not Found: ${error.message}`;
}
case 403: {
  return `Access Denied: ${error.message}`;
}
case 500: {
  return `Internal Server Error: ${error.message}`;
}
default: {
  return `Unknown Server Error: ${error.message}`;
}

}
}
  
  uploadFile(user: any, type): Observable<any> {
    this.path=localStorage.getItem('baseurl')
    console.log(this.path);
    console.log(type);
    this.apiurl = `${this.path}`+'/'+`${type}`;
  this.loginData = localStorage.getItem('LoginData');
  //  console.log(JSON.stringify(user));
  console.log(this.loginData)
  let headers = new HttpHeaders()
 

    .set("Authorization" , this.loginData);
  let httpOptions = {
    
    headers: headers,
  };


   return this.http
     .post<any>(this.apiurl, user, httpOptions)
     .pipe( catchError((error: HttpErrorResponse)=>{
      if (error.status === 401) {
        Swal.fire({
          title: 'Token Expired',
          text: "Please login",
          icon: 'warning',
          confirmButtonColor: '#3085d6',
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.clear();
            this.router.navigate([''])
          }
        })
      } else {
       
        return throwError(error);
      }
    }));
 }

 chatStream(url, body) {
  this.apiurl = this.path+`${url}`;
  this.loginData = localStorage.getItem('LoginData'); 
  
  return new Observable<string>(observer => {
    fetch(this.apiurl, {
      method: 'POST',
      body: "["+body+"]",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.loginData,
      },
    }).then(response => {
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!response.ok) {
         // handle response error 
         observer.error();
      }

      function push() {
        return reader?.read().then(({ done, value }) => {
          if (done) {
            observer.complete();
            return;
          }
          //console.log(value)
          //parse text content from response
          const events = decoder.decode(value).split('\n\n');
          let content = '';
          for (let i = 0; i < events.length; i++) {
            const event = events[i];
           // console.log(event)
            if (event === 'data: [DONE]') break;
         //   console.log(event.slice(0, 5))
            if (event && event.slice(0, 5) === 'data:') {
              const data = event.slice(5);
             // console.log(data)

              content += data || '';


            }
          }
          observer.next(content);
          push();
        });
      }

      push();
    }).catch((err: Error) => {
      // handle fetch error
      observer.error();
    });
  });
}



  delete(id: any, type): Observable<any> {
    this.path=localStorage.getItem('baseurl')
        console.log(this.path);
        console.log(type);
        this.apiurl = `${this.path}`+'/'+`${type}/${id}`;
        // this.apiurl = this.path+`${type}/${id}`;
        this.loginData = localStorage.getItem('LoginData');
        let headers = new HttpHeaders({ "Authorization": this.loginData});
        let httpOptions = {
     
          headers: headers,
        };
        return this.http
          .get<AllModulesData[]>(this.apiurl, httpOptions)
          .pipe( catchError((error: HttpErrorResponse)=>{
            if (error.status === 401) {
              Swal.fire({
                title: 'Token Expired',
                text: "Please login",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
              }).then((result) => {
                if (result.isConfirmed) {
                  localStorage.clear();
                  this.router.navigate([''])
                }
              })
            } else {
             
              return throwError(error);
            }
          }));
      }

      deletebyId(id: any, type): Observable<AllModulesData[]> {
        this.path=localStorage.getItem('baseurl')
        console.log(this.path);
        console.log(type);
        this.apiurl = `${this.path}`+'/'+`${type}/${id}`;
        // this.apiurl = this.path+`${type}/${id}`;
        this.loginData = localStorage.getItem('LoginData');
        console.log(this.apiurl+"this.loginData>>>>>>>>>"+this.loginData);
        let headers = new HttpHeaders({ "Authorization": this.loginData});
        return this.http
          .post<AllModulesData[]>(this.apiurl, this.httpOptions)
          .pipe( catchError((error: HttpErrorResponse)=>{
            if (error.status === 401) {
              Swal.fire({
                title: 'Token Expired',
                text: "Please login",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
              }).then((result) => {
                if (result.isConfirmed) {
                  localStorage.clear();
                  this.router.navigate([''])
                }
              })
            } else {
             
              return throwError(error);
            }
          }));
      }


    
deleteWithId(type): Observable<any> {
  this.path=localStorage.getItem('baseurl')
        console.log(this.path);
        console.log(type);
        this.apiurl = `${this.path}`+'/'+`${type}`;
  // this.apiurl = this.path+`${type}`;
  this.loginData = localStorage.getItem('LoginData');
  let headers = new HttpHeaders({ "Authorization": this.loginData});
  return this.http
    .post<any>(this.apiurl, {headers:headers})
    .pipe( catchError((error: HttpErrorResponse)=>{
      if (error.status === 401) {
        Swal.fire({
          title: 'Token Expired',
          text: "Please login",
          icon: 'warning',
          confirmButtonColor: '#3085d6',
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.clear();
            this.router.navigate([''])
          }
        })
      } else {
       
        return throwError(error);
      }
    }));
}


update(user: any, type,): Observable<any> {
  this.path=localStorage.getItem('baseurl')
        console.log(this.path);
        console.log(type);
        this.apiurl = `${this.path}`+'/'+`${type}`;
    // this.apiurl = this.path+`${type}`;
    var headers = new HttpHeaders().set("Authorization" , this.loginData);
    let httpOptions = {
      
      headers: headers,
    };
    this.loginData = localStorage.getItem('LoginData');
    return this.http.post<any>( this.apiurl, user, httpOptions)
    .pipe( tap(),catchError(this.handleError)
    );
  }

  del( type): Observable<any> {
    let user;
    this.path=localStorage.getItem('baseurl')
        console.log(this.path);
        console.log(type);
        this.apiurl = `${this.path}`+'/'+`${type}`;
    // this.apiurl = this.path+`${type}`;
   this.loginData = localStorage.getItem('LoginData');
   var headers = new HttpHeaders().set("Authorization" , this.loginData,)
   let httpOptions = {
     
     headers: headers,
   };
   return this.http
     .post<any>(this.apiurl, user, httpOptions)
}
getDetails(user:any, type){
  
  this.path=localStorage.getItem('baseurl')
  console.log(this.path);
  console.log(type);
  this.apiurl = `${this.path}`+'/'+`${type}`;
  // this.apiurl = this.path+`${type}`;
  this.loginData = localStorage.getItem('LoginData');
  let headers = new HttpHeaders({ "Authorization": this.loginData});
  return this.http
    .post<any>(this.apiurl,user, {headers:headers})
    .pipe(tap(), catchError(this.handleError));
  // }));
}


}