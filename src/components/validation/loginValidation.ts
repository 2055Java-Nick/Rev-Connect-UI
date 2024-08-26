

export interface ValidationError{   

    username?: string;
    password?: string;
}


export const ValidateLoginForm = (
    username: string,
    password: string


): ValidationError => {
    const errors: ValidationError = {}
    
    if(!username){
        errors.username = "Username is required!"
    }
    if(!password){
        errors.password = "Password is required!"
    }
    return errors;
}


    


