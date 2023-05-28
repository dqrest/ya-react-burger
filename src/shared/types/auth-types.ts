export type TLoginFormData = {
    password: string;
    email: string;
};

export type TLoginFormDataResponse = {
    user: TUserProfileFormData;    
};

export type TUserProfileFormData = {
    name: string;
    email: string;
    password: string;
};

export type TForgotPasswordFormData = {
    email: string;
};

export type TResetPasswordFormData = {
    password: string;
    token: string;
};