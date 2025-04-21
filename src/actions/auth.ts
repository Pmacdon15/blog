'use server'
import { signIn, signOut } from '@/auth';

// export const loginGoogle = async () => {
//     await signIn('google', { redirectTo: '/' });  
// };

// export const loginGithub = async () => {
//     await signIn('github', { redirectTo: '/' });  
// };

// export const loginGitlab = async () => {
//     await signIn('gitlab', { redirectTo: '/' }); 
// };

export const loginDiscord = async () => {
    await signIn('discord', { redirectTo: '/' }); 
};

// export const loginTwitter = async () => {
//     await signIn('twitter', { redirectTo: '/' }); 
// };

export const logout = async () => {
    await signOut({ redirectTo: '/' });  
};


