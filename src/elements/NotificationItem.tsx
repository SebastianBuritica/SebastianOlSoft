import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Card, Avatar, Paragraph} from 'react-native-paper';
import {ListItem} from 'react-native-elements';

type Notification = {
  type: string;
  details: string;
  time: string;
};

type NotificationsProps = {
  notifications: Notification[];
};

const Notifications: React.FC<NotificationsProps> = ({notifications}) => (
  <View style={styles.notificationsContainer}>
    <ScrollView>
      {notifications.map((notification, index) => (
        <Card key={index} style={styles.notificationItem}>
          <ListItem>
            <Avatar.Icon icon="bell" size={34} />
            <ListItem.Content>
              <ListItem.Title>{notification.type}</ListItem.Title>
              <Paragraph>{notification.details}</Paragraph>
              <ListItem.Subtitle>{notification.time}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </Card>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  notificationsContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
    width: 200,
    maxHeight: 300,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
  },
  notificationItem: {
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
});

export default Notifications;
