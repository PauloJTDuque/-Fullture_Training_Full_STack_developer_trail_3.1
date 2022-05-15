let p = new Promise( (resolve, reject) => {
    let resultado = 1 + 1;
    if( resultado == 2){
    resolve("sucesso!!!");
    }else{
    reject("Opa!!! Algo deu errado :( ");
    }
    });
    
    then( (message) =>{
    console.log("Mesangem no then " + message);
    }).catch( (err) => {
    console.log("Mesangem no catch " + err);
    });
    
    console.log("Código executado após a execução da função somaNumeros");