import {View, Text,Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
// import pic from '../../assets/profile.png';
import { PropsWithChildren } from 'react';

//navigation
import { useNavigation } from '@react-navigation/native';

type UserProps = PropsWithChildren<{
  user: {
    id: number;
    name: string;
    email: string;  
  }
}>;

const UserList: React.FC<UserProps> = ({user}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.userListContainer} onPress={()=>{
      console.log("Name",user.id)
      navigation.navigate('UserProfile',{user: user});
    }}>
      <Image
        style={styles.profile} 
        source={{uri:'https://picsum.photos/300'}}
      />
      <View style={styles.nameContainer}>
        <Text style={styles.textName}>{user.name}</Text>
        <Text style={styles.textEmail}>{user.email}</Text>


      </View>
    </TouchableOpacity>
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
