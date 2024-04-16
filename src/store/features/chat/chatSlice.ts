import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import { API_URL } from "../../../utils/consts";
import $axios from "../../../utils/axios";
import { ChatI, ChatType } from "../../../utils/interfacesAndTypes";
import { produce } from "immer";
import { userMe } from "../auth/authSlice";

const initialState: ChatI = {
    chats: [],
    messages: [],
    chatID: null,
    chatMessages: {}
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChat: (state, action: PayloadAction<{ chats: ChatType[] }>) => {
            state.chats = action.payload.chats;
        },
        setChatID: (state, action: PayloadAction<any>) => {
            state.chatID = action.payload.chatID;
        },
        setMessages: (state, action: PayloadAction<any>) => {
            const newMessage = action.payload.messages;
            const chat_id = action.payload.chat_id || newMessage.chat;

            console.log("chatID:", chat_id);
            console.log("newMessage", newMessage);

            state.chatMessages = produce(state.chatMessages, (draft: any) => {
                if (!draft[chat_id]) {
                    draft[chat_id] = [];
                }
                draft[chat_id].push(newMessage);
            });
        },
        setClientMessages: (state, action: PayloadAction<any>) => {
            const newMessages = Array.isArray(action.payload.messages) ? action.payload.messages : [action.payload.messages];
            const existingIds = state.messages.map((message: any) => message.id);
            
            const messagesToAdd = newMessages.filter((message: any) => !existingIds.includes(message.id));
            
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

export const sendMessageOperator = (content: string, chat_id: number): AppThunk => async () => {
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

export const chatIDStart = (client_id: number): AppThunk => async () => {
    try {
        const data = {
            client: client_id
        }
        console.log("called from server")
        const response = await $axios.post(`${API_URL}/chat/chats/`, data);
        console.log(response)
        if (!localStorage.getItem("chatID")) {
            localStorage.setItem("chatID", JSON.stringify(response.data.id));
        }
    } catch (error) {
        console.log(error);
    }
}

export const chatStart = (): AppThunk => async (dispatch) => {
    try {
        dispatch(userMe());
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
            
                dispatch(chatSlice.actions.setClientMessages({ messages: message }));
            
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

export const chatOperator = (client_id: number): AppThunk => async (dispatch) => {
    try {
        const tokenString = localStorage.getItem("tokens");
        const token = tokenString ? JSON.parse(tokenString) : null;
        const tokenValue = token ? token.access : null;
        
        if (tokenValue) {
            const websocketURL = `wss://turan-backend.online/ws/manager/${client_id}/?token=${tokenValue}`;
            const websocket = new WebSocket(websocketURL);

            websocket.onopen = () => {
                console.log('WebSocket connection is open.');
            }
            
            websocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                const message = data.message ? data.message : data;
                const chatID = message.chat_id || message.chat;
                            
                console.log(message, chatID);
                if (chatID !== undefined) {
                    if (!localStorage.getItem("chatID")) {
                        localStorage.setItem("chatID", JSON.stringify(chatID));
                    }
                    
                    dispatch(chatSlice.actions.setMessages({ messages: message, chat_id: chatID }));
                    dispatch(chatSlice.actions.setChatID({ chatID }));
                            
                    console.log('Received data from the server:', message);
                }
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

export const allChats = (): AppThunk => async (dispatch) => {
    try {
        const response = await $axios.get(`${API_URL}/chat/chats/`);
        dispatch(chatSlice.actions.setChat({ chats: response.data }))
    } catch (error) {
        console.log(error);
    }
}

export const { setChat } = chatSlice.actions;
export default chatSlice.reducer;

//230502