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
            const chat_id = action.payload.chat_id || newMessage.chat_id;

            console.log("Received chat_id:", chat_id);
        
            return produce(state, draftState => {
                if (!draftState.chatMessages[chat_id]) {
                    draftState.chatMessages[chat_id] = [newMessage];
                } else {
                    const existingMessageIndex = draftState.chatMessages[chat_id].findIndex((msg: any) => msg.text === newMessage.text && msg.sender === newMessage.sender);
                    if (existingMessageIndex === -1) {
                        draftState.chatMessages[chat_id].push(newMessage);
                    }
                }
            });
        },        
    }
});

export const sendMessage = (content: string, chat_id: number): AppThunk => async (dispatch) => {
    try {
        const data = {
            text: content
        }
        const resposne = await $axios.post(`${API_URL}/chat/send/${chat_id}/`, data);
        console.log(resposne);

        dispatch(chatSlice.actions.setMessages({ messages: resposne.data, chat_id: chat_id }));
    } catch (error) {
        console.log(error)
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
            
                console.log(data)
                const message = data.message ? data.message : data;
            
                const chatID = message.chat_id;
                
                if (chatID !== undefined) {
                    if (!localStorage.getItem("chatID")) {
                        localStorage.setItem("chatID", JSON.stringify(chatID));
                    }
                
                    dispatch(chatSlice.actions.setChatID({ chatID }));
                
                    dispatch(chatSlice.actions.setMessages({ messages: message }));
                    console.log(chatID);
                
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
            
                const chatID = message.chat_id;
                
                if (chatID !== undefined) {
                    if (!localStorage.getItem("chatID")) {
                        localStorage.setItem("chatID", JSON.stringify(chatID));
                    }
                
                    dispatch(chatSlice.actions.setChatID({ chatID }));
                
                    dispatch(chatSlice.actions.setMessages({ messages: message }));
                    console.log(chatID);
                
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