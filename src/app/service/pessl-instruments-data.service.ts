import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PesslInstrumentsDataService {
  public pubKey = '5321e4b2db1e104f6e82692503212467dc443e14c33741b4';
  public privKey = '2b37834910994feeea3561afd506ff447cbcb9e766675e4f';
  public baseurl = 'https://api.fieldclimate.com/v2';
  public request = '/data/00000264/raw/last/24h';

  public signature;
  public contentToSign;
  public hmacStr;
  constructor(private http: HttpClient) { }


  loadData() {
    // const public_key = '5321e4b2db1e104f6e82692503212467dc443e14c33741b4';
    // const private_key = '2b37834910994feeea3561afd506ff447cbcb9e766675e4f';

    const method = 'GET';
    // const baseurl = 'https://api.fieldclimate.com/v2'
    //  const request = '/data/00000264/raw/last/24h';
    const timestamp = new Date().toUTCString();  //Wed, 09 Aug 2017 20:32:38 GMT

    this.contentToSign = method + this.request + timestamp + this.pubKey;
    this.signature = CryptoJS.HmacSHA256(this.contentToSign, this.privKey);
    this.hmacStr = 'hmac ' + this.pubKey + ':' + this.signature;
    /**
     var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    headers_object.append("Authorization", "Basic " + btoa("username:password"));
    
    const httpOptions = {
      headers: headers_object
    };
     */
    const Url = this.baseurl + this.request;

    const headObj = new HttpHeaders();
    headObj.append('Content-Type', 'application/json');
    headObj.append('Authorization', this.hmacStr);
    headObj.append('Request-Date', timestamp);
    /*   const headersOptions = new HttpHeaders({
        Accept: 'application/json',
        Authorization: this.hmacStr,
        'Request-Date': timestamp
      }); */

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': this.hmacStr,
        'Request-Date': timestamp
      })
    };
    const options = { headers: httpOptions };
    return this.http.get(Url, options);

  }
}
