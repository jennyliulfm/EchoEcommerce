/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = 'http://swagger: 2.0';
}

export interface ApiConfigurationInterface {
  rootUrl?: string;
}
