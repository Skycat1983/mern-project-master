import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log("user :>> ", user);
        setUser(userCredential.user);

        // redirectTo("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("login error", error);
      });
  };

  const register = (email, displayName, password) => {
    console.log("email, password", email, password);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        updateProfile(auth.currentUser, {
          displayName: displayName,
        })
          .then(() => {
            // Profile updated!
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
        const user = userCredential.user;
        // ...
        console.log("user", user);
        // redirectTo("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log("error", error);
      });
  };

  const checkIfUserIsLoggedIn = () => {
    onAuthStateChanged(auth, (user) => {
      console.warn("checking if user is logged in");
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("user is logged in");
        setUser(user);
        setIsLoading(false);
      } else {
        // User is signed out
        // ...
        console.log("user is NOT logged in");
        setUser(null);
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  //? to  create the array of comments  for the first time (additional comments will  overwrite the previous)
  //! DOC =2. COL = 3!
  const submitReview = async (text, id) => {
    try {
      const docRef = await setDoc(
        doc(
          db,
          "Reviews",
          "test",
          `Game number ${id.id}`,
          `Review from ${new Date()}`
        ),
        {
          // revies: [
          // {
          date: Date.now(),
          displayName: user.displayName,
          email: user.email,
          gameID: "testing2",
          text: text,
          // },
          // ],
        }
      );
      // console.log("COMMMENT Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const concantenation = (id) => {
    const str = id + "-" + user.displayName;
    setConcantenator(str);
  };

  //! VERSION 3
  const polarityOfThumb = async (polarity, id) => {
    console.log("UFKJCKNSELFESIHES", polarity, id);
    try {
      console.log("IN AUTH THUMB", polarity, id);
      concantenation(id);
      const docRef = await setDoc(
        doc(db, "PolarityOfThumb", `${concantenator}`),
        {
          Polarity: `${polarity}`,
        }
      );
      console.log("THUMB Document written");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  //! LOGOUT
  const signOut = () => {
    signOut("USER LOGGED OUT", auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  //! all chldren of the provider should receive the listed values
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        isLoading,
        setIsLoading,
        submitReview,
        signOut,
        polarityOfThumb,
        // handleRadialClick,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
