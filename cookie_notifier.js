(function(){
  var item = function(id){
    var title = document.querySelector("#" + id + " .title");
    var price = document.querySelector("#" + id + " .price");
    var owned = document.querySelector("#" + id + " .owned");
    return {
      "title": title ? title.innerText : "",
      "price": price ? price.innerText : "",
      "owned": owned ? owned.innerText : ""
    };
  };
  var to_num = function(num_text){
    return parseInt(num_text.split(',').join(''));
  };
  var a = [];
  var result = null;
  var my_cookies = to_num(document.querySelector("#cookies").innerText.split(' ')[0]);
  a.push(item("product9"));
  a.push(item("product8"));
  a.push(item("product7"));
  a.push(item("product6"));
  a.push(item("product5"));
  a.push(item("product4"));
  a.push(item("product3"));
  a.push(item("product2"));
  a.push(item("product1"));
  for(var i=0,l=a.length; i<l; i++){
    var o = a[i];
    if(my_cookies > to_num(o.price)){
      result = o;
      break;
    }
  }
  result.my_cookies = my_cookies;
  if (result) chrome.extension.sendRequest(result);
}());

