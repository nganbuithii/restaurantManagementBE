import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto, } from './dto/update-notification.dto';
import { sendNotificationDTO } from './dto/send-notification.dto';
import * as admin from 'firebase-admin';


@Injectable()
export class NotificationService {

  // async sendPush(notification: sendNotificationDTO) {
  //   try {
  //     await firebase
  //       .messaging()
  //       .send({
  //         notification: {
  //           title: notification.title,
  //           body: notification.body,
  //         },
  //         token: notification.deviceId,
  //         data: {},
  //         android: {
  //           priority: 'high',
  //           notification: {
  //             sound: 'default',
  //             channelId: 'default',
  //           },
  //         },
  //         apns: {
  //           headers: {
  //             'apns-priority': '10',
  //           },
  //           payload: {
  //             aps: {
  //               contentAvailable: true,
  //               sound: 'default',
  //             },
  //           },
  //         },
  //       })
  //       .catch((error: any) => {
  //         console.error(error);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  // }
  async sendAndSaveNotification(title: string, body: string, topic: string) {
    const message = {
      notification: { title, body },
      topic,
    };

    try {
      // Lưu thông báo vào Firestore
      const notificationRef = await admin.firestore().collection('notifications').add({
        title,
        body,
        topic,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      // Gửi thông báo qua Firebase Cloud Messaging
      const response = await admin.messaging().send(message);
      console.log('Successfully sent message:', response);

      return {
        savedNotification: { id: notificationRef.id, title, body, topic },
        firebaseResponse: response,
      };
    } catch (error) {
      console.error('Error sending or saving notification:', error);
      throw error;
    }
  }

  async getNotifications() {
    try {
      const snapshot = await admin.firestore().collection('notifications').orderBy('createdAt', 'desc').get();
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting notifications:', error);
      throw error;
    }
  }
}
