import styles from '../styles/chat.module.scss';
import ChatSVG from '../assets/svgs/Vector (24).svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootStates } from '../store/store';
import { useState, useEffect, useRef } from 'react';
import { chatIDStart, chatStart, sendMessage } from '../store/features/chat/chatSlice';
import sendSVG from '../assets/svgs/Frame.svg';
import { useTranslation } from 'react-i18next';

export default function Chat() {
    const messages = useSelector((state: RootStates) => state.chat.messages);
    const dispatch = useDispatch<any>();
    const [showChat, setShowChat] = useState(false);
    const [messageText, setMessageText] = useState("");
    const userString = localStorage.getItem("userInfo");
    const user = userString ? JSON.parse(userString) : null;
    const chatIDJson = localStorage.getItem("chatID");
    const chatID = chatIDJson ? parseInt(chatIDJson) : null;
    const [isMobile, setIsMobile] = useState(window.innerWidth < 520);
    const { t } = useTranslation();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 520);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSendMessage = (e: any) => {
        e.preventDefault();
        if (chatID) {
            dispatch(sendMessage(messageText, chatID));
            setMessageText("");
        } 
        if(user && !chatID) {
            dispatch(chatIDStart(user.id))
            if(chatID) {
                dispatch(sendMessage(messageText, chatID));
                setMessageText("");
                dispatch(chatStart());
            }
        }
    }
    
    console.log(messageText)

    const chatStarted = () => {
        dispatch(chatStart());
    }

    console.log(messages)

    return (
        <div className={styles.chat} style={ isMobile ? { bottom: '100px' } : {} }>
            <div className={styles.chat_icon} onClick={() => {
                setShowChat(!showChat);
                if(!chatID) {
                    dispatch(chatIDStart(user.id))
                    chatStarted();
                } else if(chatID !== undefined && chatID !== null) {
                    chatStarted();
                    console.log("chatid уже есть")
                }
            }}>
                {showChat ? (
                    <span>X</span>
                ) : (
                    <img src={ChatSVG} alt='chat' />
                )}
            </div>
            {showChat ? (
                <>
                    <div className={styles.chat_content}>
                        <div className={styles.previus_chat}>
                            {chatID && messages[chatID] && messages[chatID].slice(1)?.map((message: any, index: number) => (
                                <div className={`${message && message.sender === user?.id ? styles.message_block_myself : ""}`} key={index}>
                                    {message && message.sender === user?.id ? (
                                        <div className={styles.message_myself}>
                                            <span className={styles.user_name}>{ user.name }</span>
                                            <p className={styles.message_text}>{message.text}</p>
                                            <span className={styles.date_message}>{ new Date(message.sent_at).toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'}) }</span>
                                        </div>
                                    ) : (
                                        <div className={styles.message_from_operator}>
                                            <span className={styles.operator__name}>{ t("operator") }</span>
                                            <p className={styles.message_text}>{message.text}</p>
                                            <span className={styles.date_message}>{ new Date(message.sent_at).toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'}) }</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    <form className={styles.form_chat} onSubmit={handleSendMessage}>
                        <input value={messageText} onChange={(e: any) => setMessageText(e.target.value)} type='text' placeholder={`${t("chat_input")}`} name='content' className={styles.sender_input} />
                        <button className={styles.sender_btn}><img src={sendSVG} /></button>
                    </form>
                </>
            ) : null}
        </div>
    )
}