import { StyleSheet } from "react-native";
const style = StyleSheet.create({
  title: {
    fontSize:35, 
    fontWeight: 'bold', 
    color: '#2b2d42', 
    lineHeight: 80
  },
  prinsubtitle:{
    fontSize:17,
    fontWeight:'normal', 
    color: '#808080',
    padding:10,
  },
  body:{
    flex:1, 
    backgroundColor:'#f5f5f5', 
    paddingVertical:30,
    padding:15,
  },
  subtitle:{
    fontSize:20,
    fontWeight:300, 
    color: '#808080',
    padding:10,
  },
  alarmlist:{
    flex:1,
    padding:5,
    flexDirection:'column',
    justifyContent:'space-between'
  },
  riga:{
    flexDirection:'row', 
    columnGap:20,
    flex:1
  },
  input:{
    borderColor:'#2b2d42',
    borderRadius: 19, 
    backgroundColor:'#dcdcdc',
    borderWidth: 1,
    padding: 8, 
    marginVertical: 8, 
    height:50,
  },
});

export default style;