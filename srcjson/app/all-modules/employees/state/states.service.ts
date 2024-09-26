import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AllModulesService } from '../../all-modules.service';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);
  private _appURL: string = environment.apiEndpoint ;
  
  constructor(private _httpClient:HttpClient, private srvModuleService: AllModulesService,) { }





}

