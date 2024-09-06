import { useRef } from "react";
import "./ChatPage.css";

function ChatPage() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  return (
    <div className="chat_container">
      <div className="chat_asside">contacts</div>
      <div className="chat_main">
        <p className="chat_text">Some text</p>
        <div className="chat_input">
          <textarea
            className="chat_input_text"
            rows={1}
            placeholder="Enter your message"
            ref={textareaRef}
            onInput={handleInput}
          ></textarea>
          <button className="chat_input_button">
            <svg
              className="chat_input_button_icon"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 14L12.2728 19.3032C12.5856 20.0331 13.5586 20.1103 13.9486 19.4185C14.7183 18.0535 15.8591 15.8522 17 13C19 8 20 4 20 4C20 4 16 5 11 7C8.14784 8.14086 5.94647 9.28173 4.58149 10.0514C3.88975 10.4414 3.96687 11.4144 4.69678 11.7272L10 14Z"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
