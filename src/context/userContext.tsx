
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from "../app/firebase"
import {
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    User,
} from "firebase/auth"

import { db } from "../app/firebase";
import { getDoc, setDoc, doc } from "firebase/firestore";


interface IUserContextProps {
    user: string;
    setUser: (user: string) => void;

}

type UserSettings = {
    id: string;
    blogPosts: BlogPost[];
    photoURL: string | null;
}

type BlogPost = {
    id: string;
    title: string;
    content: string;
}

const UserContext = createContext<
    | { 
        user: User | null;
        userSettings: UserSettings | null;
        saveUserSettings: Function;
        setEditMode: Function;
        editMode: boolean;
        saveBlogPost: Function;
        deleteBlogPost: Function;

    }
    | undefined
    > (undefined);
    

export function UserContextProvider({children}: {children: ReactNode}){
    const [user, setUser] = useState<User | null>(null);
    const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
    const [editMode, setEditMode] = useState(false);
    const allowedEmail = "jackwrundle@gmail.com";

    function saveUserSettings(header: string, content: string){
        if (user != null) {
            setUserSettings({
                id: user.uid,
                header: header,
                content: content,
                photoURL: user.photoURL,
            });
        }
    }
    function saveBlogPost(postId: string, title: string, content: string) {
        if (user != null && userSettings != null) {
          const updatedPosts = [...userSettings.blogPosts];
          const postIndex = updatedPosts.findIndex((post) => post.id === postId);
          if (postIndex !== -1) {
            updatedPosts[postIndex] = { id: postId, title, content };
          } else {
            updatedPosts.push({ id: postId, title, content });
          }
          setUserSettings({
            ...userSettings,
            blogPosts: updatedPosts,
          });
        }
      }
      
      function deleteBlogPost(postId: string) {
        if (user != null && userSettings != null) {
          const updatedPosts = userSettings.blogPosts.filter((post) => post.id !== postId);
          setUserSettings({
            ...userSettings,
            blogPosts: updatedPosts,
          });
        }
      }
    
    useEffect(() => {
        writeUserSettings(userSettings);
    }, [userSettings]);


    useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && user.email === allowedEmail) {
        setUser(user);
        const userSettingsData = await findUserSettings(user.uid, user.photoURL);
        setUserSettings(userSettingsData);
      } else {
        setUser(null);
        setUserSettings(null);
      }
    });
    return unsubscribe;
  }, []);
        

    return (
        <UserContext.Provider value={{ user, userSettings, saveUserSettings, saveBlogPost, deleteBlogPost, setEditMode, editMode }}>
          {children}
        </UserContext.Provider>
    );
}

async function findUserSettings(uid: string, photoURL: string | null) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        return {
            id: docSnap.id,
            blogPosts: data.blogPosts || [],
            photoURL: photoURL,
        };
    } else {
        return {
            id: uid,
            blogPosts: [],
            photoURL: photoURL,
        };
    }
}


function writeUserSettings(userSettings: UserSettings | null | undefined) {
    if (userSettings != null) {
        const settingsToWrite: Partial<UserSettings> = {
            blogPosts: userSettings.blogPosts || [],
            photoURL: userSettings.photoURL,
        };

        setDoc(doc(db, "users", userSettings.id), settingsToWrite);
    }
}
export const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
}


export const logOut = () => {
    signOut(auth);
} 


export function useUserContext(){
    const context = useContext(UserContext);
    return context?.user;
}

export function useUserSettingsContext() {
    const context = useContext(UserContext);
    return context?.userSettings;
}

export function useSaveUserSettingsContext() {
    const context = useContext(UserContext);
    return context?.saveUserSettings;
}

export function useEditModeContext() {
    const context = useContext(UserContext);
    return {
        editMode: context?.editMode,
        setEditMode: () => context?.setEditMode(!context.editMode),
    };
}
export function useSaveBlogPostContext() {
    const context = useContext(UserContext);
    return context?.saveBlogPost;
  }
  
  export function useDeleteBlogPostContext() {
    const context = useContext(UserContext);
    return context?.deleteBlogPost;
  }