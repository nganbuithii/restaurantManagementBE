import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {FirebaseApp,initializeApp} from 'firebase/app'
@Injectable()
export class FirebaseService {
    public app:FirebaseApp;
    constructor(private readonly configService:ConfigService) {
        this.app = initializeApp(
            {
                apiKey: this.configService.get<string>('apiKey'),
                authDomain: this.configService.get<string>('authDomain'),
                projectId: this.configService.get<string>('projectId'),
                storageBucket: this.configService.get<string>('storageBucket'),
                messagingSenderId: this.configService.get<string>('messagingSenderId'),
                appId: this.configService.get<string>('appId'),
                measurementId: this.configService.get<string>('measurementId'),
            }
        );
    }
}
