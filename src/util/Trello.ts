import axios, { AxiosResponse } from "axios";
import { Client } from "discord.js";

class TrelloClient {
    private client: Client;
    private apiKey: string;
    private token: string;
    private baseURL: string;
    private moduleActive: boolean;

    constructor(client: Client) {
        this.client = client;
        this.apiKey = client.config.trello.apikey;
        this.token = client.config.trello.token;
        this.baseURL = client.config.trello.baseURL;
        this.moduleActive = client.config.trello.enabled;
    }

    isActive(): boolean {
        return this.moduleActive;
    }

    async getBoards(): Promise<AxiosResponse<any, any>> {
        return axios.get(`${this.baseURL}members/me/boards?key=${this.apiKey}&token=${this.token}`)
    }

    async getCards(boardId: string): Promise<AxiosResponse<any, any>> {
        return axios.get(`${this.baseURL}boards/${boardId}/cards?key=${this.apiKey}&token=${this.token}`);
    }

    async getLists(boardId: string): Promise<AxiosResponse<any, any>> {
        return axios.get(`${this.baseURL}boards/${boardId}/lists?key=${this.apiKey}&token=${this.token}`);
    }

    async createCard(listId: string, name: string): Promise<AxiosResponse<any, any>> {
        return axios.post(`${this.baseURL}cards/?name=${name}&idList=${listId}&key=${this.apiKey}&token=${this.token}`);
    }

    async commentOnCard(cardId: string, text: string): Promise<AxiosResponse<any, any>> {
        return axios.post(`${this.baseURL}cards/${cardId}/actions/comments?text=${text+"%0A%0A*Automatisierte Nachricht | Athena*"}&key=${this.apiKey}&token=${this.token}`)
    }

    async moveCardToList(cardId: string, listId: string): Promise<AxiosResponse<any, any>> {
        return axios.put(`${this.baseURL}cards/${cardId}?idList=${listId}&key=${this.apiKey}&token=${this.token}`)
    }
}

export default TrelloClient;