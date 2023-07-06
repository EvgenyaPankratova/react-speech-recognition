import React, { useState, useEffect } from "react";
import Main from "./components/Main";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "ru-RUS";

function App() {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [voiseMessageSaved, setVoiseMessageSaved] = useState<any[]>([]);

  useEffect(() => {
    const handleListen = () => {
      if (isListening) {
        mic.start();
        mic.onend = () => {
          console.log("continue..");
          mic.start();
        };
      } else {
        mic.stop();
        mic.onend = () => {
          console.log("Stopped Mic on Click");
        };
      }
      mic.onstart = () => {
        console.log("Mics on");
      };

      mic.onresult = (event: any) => {
        const transcript: string = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        console.log(transcript);
        setMessage(transcript + " " + Math.round(Math.random() * 100)); //добавляем случайное число
        mic.onerror = (event: any) => {
          console.log(event.error);
        };
      };
    };
    handleListen();
  }, [isListening]);

  const handleSaveVoiceMessage = () => {
    setVoiseMessageSaved([...voiseMessageSaved, message]);
    setMessage("");
  };

  return (
    <>
      <div className="container">
        <h2 className="title">
          Скажите что-нибудь, и это преобразуется в текст
        </h2>
        <Main
          isListening={isListening}
          setIsListening={setIsListening}
          handleSaveVoiceMessage={handleSaveVoiceMessage}
          message={message}
          voiseMessageSaved={voiseMessageSaved}
        />
      </div>
    </>
  );
}

export default App;
