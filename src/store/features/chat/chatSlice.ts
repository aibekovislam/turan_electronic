import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import { API_URL } from "../../../utils/consts";
import $axios from "../../../utils/axios";
import axios from "axios";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: [],
        messages: <any>[],
        chatID: null
    },
    reducers: {
        setChat: (state, action: PayloadAction<any>) => {
            state.chats = action.payload.chats;
        },
        setChatID: (state, action: PayloadAction<any>) => {
            state.chatID = action.payload.chatID;
        },
        setMessages: (state, action: PayloadAction<any>) => {
            const newMessages = action.payload.messages;
            
            // Преобразовать в массив, если это не массив
            const messagesToAdd = Array.isArray(newMessages) ? newMessages : [newMessages];
        
            // Добавить новые сообщения к текущим сообщениям
            state.messages = [...state.messages, ...messagesToAdd];
        }        
    }
});

export const sendMessage = (content: string, chat_id: number): AppThunk => async () => {
    try {
        const data = {
            text: content
        }
        const resposne = await $axios.post(`${API_URL}/chat/send/${chat_id}/`, data);
        console.log(resposne);
    } catch (error) {
        console.log(error)
    }
}

export const chatStart = (): AppThunk => async (dispatch) => {
    try {
        const tokenString = localStorage.getItem("tokens");
        const token = tokenString ? JSON.parse(tokenString) : null;
        const tokenValue = token ? token.access : null;
        
        if (tokenValue) {
            const websocketURL = `wss://turan-backend.online/ws/chat/?token=${tokenValue}`;
            const websocket = new WebSocket(websocketURL);

            websocket.onopen = () => {
                console.log('WebSocket connection is open.');
            }
            
            websocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
            
                const message = data.message ? data.message : data;
            
                const chatID = message.chat_id;
                
                if (!localStorage.getItem("chatID")) {
                    localStorage.setItem("chatID", JSON.stringify(chatID));
                }
            
                dispatch(chatSlice.actions.setChatID({ chatID }));
            
                dispatch(chatSlice.actions.setMessages({ messages: message }));
            
                console.log('Received data from the server:', message);
            };                  

            websocket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            websocket.onclose = (event) => {
                console.log('WebSocket connection is closed.', event.code, event.reason);
            };
        } else {
            console.error('Token is invalid or missing.');
        }

    } catch (error) {
        console.log(error);
    }
}

export const { setChat } = chatSlice.actions;
export default chatSlice.reducer;