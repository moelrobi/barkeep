import axios, { AxiosResponse } from "axios";
import { Client } from "discord.js";

class TrelloClient {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async getBoards(): Promise<AxiosResponse<any, any>> {
        return axios.get(`${this.client.config.trello.baseURL}members/me/boards?key=${this.client.config.trello.apikey}&token=${this.client.config.trello.token}`)
    }

    async getCards(boardId: string): Promise<AxiosResponse<any, any>> {
        return axios.get(`${this.client.config.trello.baseURL}boards/${boardId}/cards?key=${this.client.config.trello.apikey}&token=${this.client.config.trello.token}`);
    }

    async getLists(boardId: string): Promise<AxiosResponse<any, any>> {
        return axios.get(`${this.client.config.trello.baseURL}boards/${boardId}/lists?key=${this.client.config.trello.apikey}&token=${this.client.config.trello.token}`);
    }
}

export default TrelloClient;