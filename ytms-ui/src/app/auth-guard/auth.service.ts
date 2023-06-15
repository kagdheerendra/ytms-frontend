import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private http: HttpClient) {

  }
  // Authentication Methods 

  isAuthenticated(): boolean {
    return this.getToken() !== undefined;
  }

  storeToken(token: string, auth_type: string) {
    this.storage.set("auth_token", token);
    // this.storage.set("auth_type", auth_type);
  }

  getAuthType(): string {
    if (this.storage.get("auth_type") !== null) {
      return this.storage.get("auth_type");
    } else {
      return "";
    }
  }

  getToken() {
    return this.storage.get("auth_token");
  }

  removeToken() {
    // this.storage.remove("auth_type");
    return this.storage.remove("auth_token");
  }

}
