import {View, Text, StyleSheet, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import bannerImage from '../../assets/profilebanner.jpg';
import profilePic from '../../assets/profile.png';
const UserDetails = ({route}) => {
  const {user} = route.params;

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.banner}>
        <Image style={styles.bannerImage} source={{uri:'https://picsum.photos/280'}}/>
      </View>

      <View style={styles.profilePicContainer}>
        <Image  style={styles.profilePic} source={{uri:'https://picsum.photos/300'}}/>
        <Text style={styles.name}>
          {user.name}
        </Text>
        
        <View style ={styles.divider}></View>
        <View style={styles.userInfo}>
          <View style={styles.topInfo}>
            <View style={styles.left}>
              <Text style={styles.infoHeading}>Email</Text>
              <Text style={styles.infoText}>{user.email}</Text>
            </View>

            <View style={styles.right}>
              <Text style={styles.infoHeading}>Phone</Text>
              <Text style={styles.infoText}>{user.phone.split(' x')[0]}</Text>
            </View>
          
          </View>

          <View style={styles.bottomInfo}>
            <View style={styles.left}>
              <Text style={styles.infoHeading}>Address</Text>
              <Text style={styles.infoText}>{`${user.address.suite},${user.address.street}, ${user.address.city}, ${user.address.zipcode} `}</Text>
            </View>

            <View style={styles.right}>
              <Text style={styles.infoHeading}>Organization</Text>
              <Text style={styles.infoText}>{user.company.name}</Text>
            </View>
          </View>
        
        </View>

      </View>

      

     
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    
  },

  banner: {
    flex: 1/2,
    width: '100%',

  },
  bannerImage: {
    height:'100%' ,
    width: '100%',

  },
  profilePicContainer: {
    height: 'auto',
    position: 'relative',
    top: -100,
    alignItems:'center',
    // justifyContent: 'center',
    width: '100%',
    // backgroundColor: '#414141',
  },
  profilePic: {
    height: 150,
    width:150,
    borderRadius: 100,
    // backgroundColor: '#414141',

  },
  name : {
    marginTop:8,
    fontSize: 22,
    fontWeight: '800',
    alignSelf: 'center',
    // backgroundColor: 'red'
    marginBottom:30,
    color:'#663179',

  },
  divider: {
    width:'100%',
    borderTopWidth: 1,
    borderColor: '#41414141',
    // borderBottomWidth: 1,
  },
  userInfo: {
    // paddingTop:5
    marginTop:30,
    // flexDirection: 'row',
    // backgroundColor: '#41414141',
    width :'100%',
    height: 200,


  },
  topInfo: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '50%',
    // alignItems: 'stretch',
    justifyContent: 'space-evenly',
    paddingVertical: 4

    // backgroundColor: 'orange',
  },
  left: {
    // backgroundColor: 'orange',
    width:'50%',
    paddingLeft: 30,

  },
  right:{
    // backgroundColor: 'green',
    width:'50%',
    paddingLeft: 30,
  },

  bottomInfo: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '50%',
    // alignItems: 'stretch',
    justifyContent: 'space-evenly',

    // backgroundColor: 'green',
  },
  infoHeading: {
    fontSize: 20,
    fontWeight: '800',
    color:'#663179',
    marginTop:5,


  },
  infoText: {
    fontSize: 15,
    fontWeight: '800',
    marginTop: 8,
    marginBottom:5,
    color: 'gray',


  },
})
export default UserDetails;
