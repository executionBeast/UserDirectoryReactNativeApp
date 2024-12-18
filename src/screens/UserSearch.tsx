import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  View,
  FlatList
} from 'react-native';
import { SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';

import UserList from '../components/UserList';

function UserSearch(): JSX.Element {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const options = {method:'GET', headers:{accept: 'application/json'}};
  const [searchQuery, setSearchQuery] = React.useState('');
  const [userData, setUserData] = React.useState([]);
  const [filteredUserData, setFilteredUserData] = React.useState([])
  const [isApiError, setIsApiError] = React.useState(false);
  useEffect(()=>{
    (async function(){
        try{
          const response = await axios.get(url);
            setUserData(response.data);
            setFilteredUserData(response.data)
            setIsApiError(false);
        }
        catch(err){
            console.log("Axios Fetch Error ->", err)
            setIsApiError(true);
        }
      

    })();
    
  },[url])

  useEffect(()=>{
    if (searchQuery.trim() === '') {
        setFilteredUserData(userData); // Reset to all users
        return;
    }
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    const filteredData = userData.filter(user =>
        user.name.toLowerCase().includes(lowerCaseSearchQuery)
    )
    setFilteredUserData(filteredData)
  },[searchQuery, userData])

  return (
        <SafeAreaView style={styles.screenContainer}>
        
        <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
              placeholder="Search"
              placeholderTextColor='#21212199'
            />
        </View>
        <Text style={{fontSize:20,color:'black'}}>{searchQuery}</Text>

        {!isApiError === true ? (
          
          <FlatList style={styles.userListContainer}
          data={filteredUserData}
          renderItem={({item})=> <UserList user={item}/>}
        />
        
        ):(
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error Fetching User Data</Text>
            <Text style={[styles.errorText,{color:'black'}]}>Check Internet Connection</Text>

          </View>
        )}
         
      

        </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
  },

  searchContainer: {
    height: '20%',
    width: '100%',
    padding:8,
    flex: 1/20,
    flexDirection: 'row',
    marginBottom: 8,
    color:'black',
    // backgroundColor:'black',
  },
  searchInput: {
    height: 65,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    color:'black',
    fontSize:20,
    backgroundColor: '#f8f8f8',
    // backgroundColor:'red',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  searchButton: {
    width: '10%',
    height:50,
    borderWidth: 1,
    borderRadius: 10,
  },

  userListContainer: {
    flex: 1,
    height:'80%',
    width:'100%',
    padding:8,
    // backgroundColor: '#84848484',
    borderRadius: 8,
  },
  errorContainer: {
    flex: 2/3,
    alignItems:'center',
    justifyContent:'center',
  },
  errorText: {
    fontSize: 30,
    color:'red',
    fontWeight:'800',
  }
});

export default UserSearch;
