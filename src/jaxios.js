
function  gettoken(){
  // let customers_id=window.location.search;
  
  var a=sessionStorage.getItem("token")
  console.log(a)
  return a
}
    export  const token1=gettoken()
    
