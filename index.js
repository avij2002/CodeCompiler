

var language = document.getElementById("languages");
var compile_btn = document.getElementById("compile");
var code_text = document.getElementById("text_editor");
var compiler = document.getElementById("compiler");




compile_btn.addEventListener("click",function(){

  let data = {
    code:code_text.value,
    langId:language.value
  }
var request = new XMLHttpRequest();
request.open("post","https://codequotient.com/api/executeCode");

request.setRequestHeader('Content-Type', 'application/json');

request.addEventListener("load",function(event){
   let {codeId,error} = JSON.parse(event.target.responseText);
  compiler.innerText="compiling..."
  if(codeId)
  {
    const interval = setInterval(()=>{

      var request2 = new XMLHttpRequest();
      var url = `https://codequotient.com/api/codeResult/${codeId}`
      request2.open("get",url);
    request2.addEventListener("load",function()
    {
      let {data} = JSON.parse(request2.responseText);
      console.log(data);
                if(JSON.parse(data).output) {
         compiler.innerText = JSON.parse(data).output
                  clearInterval(interval)
        } 
        else if(JSON.parse(data).errors){
          compiler.innerText = JSON.parse(data).errors
          clearInterval(interval)
         } 
            
    })
    request2.send();

    },5000)
  }
  else
  {
    alert(error)
  }
    
})
  request.send(JSON.stringify(data));
})



  
  
  
