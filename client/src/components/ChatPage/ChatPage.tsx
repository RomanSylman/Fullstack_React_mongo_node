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
          <button className="chat_input_button">send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
