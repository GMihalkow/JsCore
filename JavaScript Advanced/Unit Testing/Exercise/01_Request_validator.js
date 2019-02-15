function solve(inputObj){
    const errorMessagee = "Invalid request header: Invalid ";
    const validMethods = [ "GET", "POST", "DELETE", "CONNECT" ];
    
    const uriRegex = /^[A-Za-z0-9\.]+$/;

    const validHTTPVersions = [ "HTTP/0.9", "HTTP/1.0", "HTTP/1.1", "HTTP/2.0" ];

    const messageRegex = /^[^\<\>\&\'\"\\]*$/;

    if(!inputObj.method || !validMethods.includes(inputObj.method)){
        throw new Error(errorMessagee + "Method");
    } else if((!inputObj.uri || !uriRegex.test(inputObj.uri)) && inputObj.uri !== "*"){
        throw new Error(errorMessagee + "URI");
    } else if(!inputObj.version || !validHTTPVersions.includes(inputObj.version)){
        throw new Error(errorMessagee + "Version");
    } else if((inputObj.message) === undefined || !messageRegex.test(inputObj.message)){
        throw new Error(errorMessagee + "Message");
    } else {
        return inputObj;
    }
}
