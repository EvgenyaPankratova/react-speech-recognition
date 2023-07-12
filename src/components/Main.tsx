import React, { FC } from "react";

interface MainProps {
  isListening: boolean;
  setIsListening: any;
  handleSaveVoiceMessage: () => void;
  message: string | null;
  voiseMessageSaved: any[];
}

const Main: FC<MainProps> = ({
  isListening,
  setIsListening,
  handleSaveVoiceMessage,
  message,
  voiseMessageSaved,
}) => {
  const onClickMic = () => {
    setIsListening((prevState: boolean) => !prevState);
  };

  return (
    <main className="main">
      <div>
        <div className="box">
          <div>Нажмите на иконку микрофона и скажите что-нибудь...</div>
          <div onClick={onClickMic} className={isListening ? `pulse` : ""}>
            <img
              className={
                isListening ? `microphoneIconClicked` : `microphoneIcon`
              }
              src="https://cdn-icons-png.flaticon.com/512/2983/2983786.png"
              alt="microphone"
            />
          </div>
          <button
            onClick={handleSaveVoiceMessage}
            disabled={!message}
            className={`box__button ${message ? "box__button_active" : null}`}
          >
            Преобразовать в текст
          </button>
        </div>
      </div>
      <div>
        <div className="box">
          <div className="box__result">
            Результат
            <p>{message ? "" : message}</p>
            {voiseMessageSaved.map((elem) => (
              <p key={elem}>{elem}</p>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
