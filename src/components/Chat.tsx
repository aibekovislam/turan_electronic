import styles from '../styles/chat.module.scss';
import ChatSVG from '../assets/svgs/chat-svgrepo-com.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootStates } from '../store/store';
import { useState, useEffect, useRef } from 'react'; // Добавлены хуки useEffect и useRef
import { chatStart, sendMessage } from '../store/features/chat/chatSlice';

export default function Chat() {
    const messages = useSelector((state: RootStates) => state.chat.messages);
    const dispatch = useDispatch<any>();
    const [showChat, setShowChat] = useState(false);
    const [messageText, setMessageText] = useState("");
    const userString = localStorage.getItem("userInfo");
    const user = userString ? JSON.parse(userString) : null;
    const chatIDJson = localStorage.getItem("chatID");
    const chatID = chatIDJson ? parseInt(chatIDJson) : null;

    const messagesEndRef = useRef<HTMLDivElement>(null); // Создана ссылка на конец сообщений

    useEffect(() => {
        // Прокрутка вниз при обновлении сообщений
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]); // Обновление useEffect при изменении messages

    const handleSendMessage = (e: any) => {
        e.preventDefault();
        if (chatID) {
            dispatch(sendMessage(messageText, chatID));
            setMessageText("");
            console.log("Message text after clearing:", messageText);
        }
    }

    console.log(chatID);

    const chatStarted = () => {
        dispatch(chatStart());
    }

    return (
        <div className={styles.chat}>
            <div className={styles.chat_icon} onClick={() => {
                setShowChat(!showChat);
                if (messages.length === 0) {
                    chatStarted();
                }
            }}>
                {showChat ? (
                    <span>X</span>
                ) : (
                    <img src={ChatSVG} alt='chat' />
                )}
            </div>
            {showChat ? (
                <div className={styles.chat_content}>
                    <div className={styles.previus_chat}>
                        {messages && messages.slice(1).map((message: any, index: number) => (
                            <div className={`${message && message.sender === user?.id ? styles.message_block_myself : ""}`} key={index}>
                                {message && message.sender === user?.id ? (
                                    <div className={styles.message_myself}>
                                        <p className={styles.message_text}>{message.text}</p>
                                    </div>
                                ) : (
                                    <div className={styles.message_from_operator}>
                                        <p className={styles.message_text}>{message.text}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} /> {/* Ссылка на конец сообщений */}
                    </div>
                    <form className={styles.form_chat} onSubmit={handleSendMessage}>
                        <input onChange={(e: any) => setMessageText(e.target.value)} type='text' placeholder='Введите сообщение оператору:' name='content' className={styles.sender_input} />
                        <button className={styles.sender_btn}>Отправить</button>
                    </form>
                </div>
            ) : null}
        </div>
    )
}