import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/chat.module.scss';
import { useEffect, useRef, useState } from 'react';
import { allChats, chatOperator, sendMessageOperator } from '../store/features/chat/chatSlice';
import { RootStates } from '../store/store';
import sendSVG from '../assets/svgs/Frame.svg';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function AdminChatPage() {
    const userString = localStorage.getItem("userInfo");
    const user = userString ? JSON.parse(userString) : null;
    const dispatch = useDispatch<any>();
    const chats = useSelector((state: RootStates) => state.chat.chats);
    const [messageText, setMessageText] = useState("");
    const [ pickedChat, setPickedChat ] = useState(0);
    const messages = useSelector((state: RootStates) => state.chat.chatMessages);

    const navigate = useNavigate();

    const chatMessagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(user.id !== 1) {
            navigate("/")
        }
    }, [])

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages, pickedChat]);

    useEffect(() => {
        dispatch(allChats());
    }, [dispatch])

    const handleSendMessage = (e: any) => {
        e.preventDefault();
        if (pickedChat !== 0) {
            dispatch(sendMessageOperator(messageText, pickedChat));
            setMessageText("");
            console.log("Message text after clearing:", messageText);
        }
    }

    const getLastMessageText = (chatMessages: any[]) => {
        if (chatMessages && chatMessages.length > 0) {
            const lastMessage = chatMessages[chatMessages.length - 1];
            return lastMessage.text;
        }
        return "";
    };

    console.log(messages);
    
    return (
        <>
            <Helmet>
                <title>Turan electronics - чат админа</title>
                <meta name="description" content="Интернет магазин Turan Electronics KG, интернет магазин для электроники в Кыргызстане, вы можете купить любой товар начиная Google Pixel заканчивая Apple Iphone и Dyson"></meta>
                <link rel="canonical" href={`https://turanelectronics.kg/admin/chat`} />
            </Helmet>
            <div className={styles.chat_admin}>
                <div className={styles.path}>
                    <a href="/">Главная</a> / <a href="#">Чат</a>
                </div>
                <div className={styles.d_f_chat_admin}>
                    <div className={styles.all_chats}>
                        { chats.slice(2).map((chat, index) => (
                            <div key={index} onClick={() => {
                                    setPickedChat(chat.id);
                                    dispatch(chatOperator(chat.client))
                                }} className={styles.main_chats_detail} style={{ width: "100%", position: "relative" }}>
                                <div className={styles.chat_admin_details}>
                                    <span className={styles.chat_updated}>{ new Date(chat.updated_at).toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'}) }</span>
                                    <div className={styles.text_chat}>
                                        <span className={styles.client_name}>{ chat.client_email !== "admin@admin.com" ? chat.client_email : null }</span>
                                        <p className={styles.last_message}>{getLastMessageText(messages[chat.id])}...</p>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        )) }
                    </div>
                    <div className={styles.opened_chat}>
                        <div className={styles.chat_with_messages} ref={chatMessagesRef}>
                            { pickedChat === 0 ? (
                                <h2 style={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: "100%", margin: 0 }}>Выберите чат</h2>
                            ) : null }
                            {pickedChat !== 0 && messages[pickedChat] && messages[pickedChat].slice(1).map((message: any, index: number) => (
                                <div className={`${message && message.sender === user?.id ? styles.message_block_myself : ""}`} key={index}>
                                    {message && message.sender === user?.id ? (
                                        <div className={styles.message_from_operator}>
                                            <span className={styles.operator__name}>Оператор</span>
                                            <p className={styles.message_text}>{message.text}</p>
                                            <span className={styles.date_message}>{ new Date(message.sent_at).toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'}) }</span>
                                        </div>
                                    ) : (
                                        <div className={styles.message_myself}>
                                            <span className={styles.user_name}>Клиент</span>
                                            <p className={styles.message_text}>{message.text}</p>
                                            <span className={styles.date_message}>{ new Date(message.sent_at).toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'}) }</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        { pickedChat !== 0 ? (
                            <form className={styles.form_chat_admin} onSubmit={handleSendMessage}>
                                <input value={messageText} onChange={(e: any) => setMessageText(e.target.value)} type='text' placeholder='Сообщение...' name='content' className={styles.sender_input_admin} />
                                <button className={styles.sender_btn_admin}><img src={sendSVG} /></button>
                            </form>
                        ) : null }
                    </div>
                </div>
            </div>
        </>
    )
}
