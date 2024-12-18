import {View, Text,Image, StyleSheet} from 'react-native';
import React from 'react';
import pic from '../../assets/profile.png';
import { PropsWithChildren } from 'react';

type UserProps = PropsWithChildren<{
  user: {
    name: string;
    email: string;  
  }
}>;

const UserList: React.FC<UserProps> = ({user}) => {
  return (
    <View style={styles.userListContainer}>
      <Image 
        style={styles.profile} 
        source={pic}
      />
      <View style={styles.nameContainer}>
        <Text style={styles.textName}>{user.name}</Text>
        <Text style={styles.textEmail}>{user.email}</Text>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    userListContainer: {
        flex:1,
        flexDirection:'row',
        marginBottom: 8,
        marginTop: 8,
        // backgroundColor: '#818181',

    },
    nameContainer: {
        flex:1,
        justifyContent: 'space-between',
        paddingBottom: 4,
        marginLeft: 8,
        borderColor: '#99999999',
        borderBottomWidth: 1,


    },
    textName:{
        fontSize:18,
        fontWeight: '900',
        color: 'black',
    },
    textEmail: {
        fontSize:15,
        fontWeight: '400',
        color: 'black'

    },
    profile: {
        height: 70,
        width: 70,
        borderRadius: 100,
        backgroundColor: '#453546',
        marginRight:8,

    }
})

export default UserList;
