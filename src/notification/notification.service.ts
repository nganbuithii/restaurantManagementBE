import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { IUser } from 'interfaces/user.interface';

@Injectable()
export class NotificationService {
  async sendAndSaveNotification(title: string, body: string, topic: string) {
    const message = {
      notification: { title, body },
      topic,
    };

    try {
      const notificationRef = await admin.firestore().collection('notifications').add({
        title,
        body,
        topic,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        readBy: {}, 
      });

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

  async getNotifications(user:IUser) {
    try {
      const snapshot = await admin.firestore().collection('notifications')
        .orderBy('createdAt', 'desc')
        .get();
      
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          isRead: data.readBy && data.readBy[user.sub] ? true : false
        };
      });
    } catch (error) {
      console.error('Error getting notifications:', error);
      throw error;
    }
  }

  async getUnreadNotificationsCount(user:IUser) {
    try {
      const snapshot = await admin.firestore().collection('notifications').get();
      const unreadCount = snapshot.docs.filter(doc => {
        const data = doc.data();
        return !data.readBy || !data.readBy[user.sub];
      }).length;
      return unreadCount;
    } catch (error) {
      console.error('Error getting unread notifications count:', error);
      throw error;
    }
  }

  async markNotificationAsRead(notificationId: string, user:IUser) {
    try {
      const notificationRef = admin.firestore().collection('notifications').doc(notificationId);
      await notificationRef.update({
        [`readBy.${user.sub}`]: true
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }
}