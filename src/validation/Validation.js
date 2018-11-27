export const checkEmail=(email)=>{
    var re =/^[a-z,0-9]+@[a-z]+\.[a-z]+$/;
    //var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/;
    return re.test(email);
};
export const checkPassword = (pass) =>{
    var r=/^.{6,}$/;
    return r.test(pass);
};

export const empty =(email,password,mno,name)=>{
    if(email ==='' && password ==='' && mno ==='' && name ===''){
        return true;
    }
};

export const oneEmpty=(email,mno,password,name)=>{
    if(email === '' || mno === '' || password === '' || name === ''){
        return true;
    }
};

export const emailEmpty=(email)=>{
    if(email ===''){
        return true;
    }
};

export const passwordEmpty=(password)=>{
    if(password ===''){
        return true;
    }
};

export const nameEmpty=(name)=>{
    if(name ===''){
        return true;
    }
};
export const checkMno=(mno)=>{
    var re =/^[0-9]{10}$/;
    //var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/;
    return re.test(mno);
};
