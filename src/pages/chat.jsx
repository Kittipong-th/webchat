import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { signOut } from "firebase/auth";

function Chat() {
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const shift = 3;

  const messageRef = collection(db, "messages");
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(messageRef, orderBy("createAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setChatMessages(messages);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function encrypt(text, shift) {
    let result = "";

    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      const shiftedChar = char + shift;
      result += String.fromCharCode(shiftedChar);
    }
    return result;
  }

  function decrypt(text, shift) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      const shiftedChar = char - shift;
      result += String.fromCharCode(shiftedChar);
    }
    return result;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(newMessage);
    const userEmail = auth.currentUser.email;
    const userName = userEmail.split("@")[0];

    if (newMessage.trim() === "") return;
    const encryptedMessage = encrypt(newMessage, shift);
    await addDoc(messageRef, {
      text: encryptedMessage,
      createAt: serverTimestamp(),
      user: userName,
    });
    setNewMessage("");
  };

  const Logout = async () => {
    try {
      await signOut(auth); // Sign out the current user
      console.log("Signout Success");
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <div className="h-screen text-white flex flex-col justify-center items-center bg-cover bg-[url('https://theagiledirector.com/images/kanban-blambarde-BYNC-small.jpg')]">
        <div className="bg-neutral-700 p-10 rounded-xl">
          <h1 className="text-4xl font-bold text-white text-center mb-6 ">
            Chat Room
          </h1>
          <div>
            {chatMessages.map((message, index) => (
              <div key={index}>
                {message.user}: {decrypt(message.text, shift)}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="mt-5 flex gap-3">
            <input
              className="text-black"
              type="text"
              placeholder="enter your messages"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
            <button
              type="submit"
              className="bg-white text-black p-1 rounded-sm"
            >
              Send
            </button>
          </form>
          <div className="mt-7 text-center flex justify-end">
            <button
              type="submit"
              className="bg-white text-black p-1 rounded-sm w-2/3"
              onClick={Logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
