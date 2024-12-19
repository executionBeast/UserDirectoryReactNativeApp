import React, { useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import { SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';

import UserList from '../components/UserList';

//api error handling 
//1. While isPending Show Loader
//2. 


function UserSearch(): JSX.Element {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const options = {method:'GET', headers:{accept: 'application/json'}};
  const [searchQuery, setSearchQuery] = React.useState('');
  const [userData, setUserData] = React.useState([]);
  const [filteredUserData, setFilteredUserData] = React.useState([])
  const [isApiError, setIsApiError] = React.useState(false);
  const [isPending, setIsPending] = React.useState(true);
  const [isSort, setIsSort] = React.useState(false);
  useEffect(()=>{
    (async function(){
        try{
          setIsPending(true);
          const response = await axios.get(url);
            setFilteredUserData(response.data)
            setUserData(response.data);
            // console.log("error in fetching",response.data)
            // setUserData([]);
            setIsApiError(false);
        }
        catch(err){
            console.log("Axios Fetch Error ->", err)
            setIsApiError(true);
        }
        finally{
          setIsPending(false);
        }
      

    })();
    
  },[url])

  useEffect(()=>{
    if (searchQuery.trim() === '') {
        setFilteredUserData(userData); 
        return;
    }
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    const filteredData = userData.filter(user =>
        user.name.toLowerCase().includes(lowerCaseSearchQuery)
    )
    setFilteredUserData(filteredData)
  },[searchQuery, userData])
  const sortHandler = ()=>{
    setIsSort(prev => {
      const isSortNewState = !prev
      if(isSortNewState){
        const sortedUserData = [...filteredUserData].sort((a,b)=>
        a.name.localeCompare(b.name)
        );
        setFilteredUserData(sortedUserData);
      }
      else{
        setFilteredUserData(userData);
      }
    return isSortNewState;
    });
    // if(isSort){} Can't do this becoz there is delay in state change
  }
  return (
        <SafeAreaView style={styles.screenContainer}>
        
        <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={text => {
                console.log("Text --> ",text)
                setSearchQuery(text)
              
              }}
              placeholder="Search"
              placeholderTextColor='#21212199'
            /> 
        <View style={styles.sortBtnContainer}>
          <TouchableHighlight 
            underlayColor={'#CEEFCF'} 
            activeOpacity={0.8} 
            onPress={sortHandler} 
            style={[styles.sortBtn, {backgroundColor: isSort ? '#CEEFCD': '#41414141'}]}>
            <Text style={styles.sortBtnText}>A-Z</Text>
          </TouchableHighlight>
        </View>
        </View>
        
        {!isApiError === true ? ( 
            <>{!isPending === true ? (
            <View style={styles.userListContainer}>
            <FlatList
              data={filteredUserData}
              renderItem={({item,key})=> <UserList key={key} user={item}/>}
              keyExtractor={item=> item.email}
              ListEmptyComponent={
              <View style={styles.errorContainer}>
                  <Text style={{fontSize:20, color:'green'}}>No User Found!</Text>
              </View>
              }/>
              </View>
          ):(
            <View style={styles.errorContainer}>
                  <ActivityIndicator size="large" color="#0000ff" />
                  <Text>Loading...</Text>
              </View>
          )}
          </>
        ):(
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error Fetching User Data</Text>
            <Text style={[styles.errorTextInfo,{color:'black'}]}>Check Internet Connection</Text>

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
  sortBtnContainer: {
    // alignItems: 'center',
    justifyContent: 'center',
    marginTop:5,
    height: 40,
    // backgroundColor: 'red',
    width: '100%',
  },
  sortBtn: {
    height:'100%',
    width:60,
    borderRadius: 16,
    backgroundColor: '#41414141',
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color:'#B5E1B8'
  
  },
  sortBtnText: {
    fontSize:16,
    fontWeight: '700',
    // alignSelf: 'center',
    // textAlign: 'center',
  },


  userListContainer: {
    marginTop:50,
    flex: 1,
    height:'80%',
    width:'100%',
    padding:8,
    // backgroundColor: '#84848484',
    borderRadius: 8,
  },
  errorContainer: {
    marginTop:100,
    flex: 2/3,
    alignItems:'center',
    justifyContent:'center',
  },
  errorText: {
    fontSize: 30,
    color:'red',
    fontWeight:'800',
  },
  errorTextInfo: {
    fontSize: 25,
    fontWeight:'800',
  }
});

export default UserSearch;
