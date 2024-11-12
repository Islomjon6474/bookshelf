    import { makeAutoObservable } from "mobx";
    import Cookies from "js-cookie";
    import { api, generateAuthHeaders } from "../services/api";
    import { Book } from "../types";
    import React from "react";
    import { saveCredentials } from "../utils/cookies";

    export class BookStore {
        books: Record<string, Book> = {};
        isAuthenticated: boolean = !!Cookies.get("userKey");
        loading: boolean = false;
        bookStatuses: Record<number, string> = {
            0: "New",
            1: "Reading",
            2: "Finished",
        }

        constructor() {
            makeAutoObservable(this);
        }

        fetchBooks = async () => {
            try {
                const headers = generateAuthHeaders("GET", "/books", null);
                console.log("Headers:", headers);
                const response = await api.get("/books", { headers });
                console.log("Books fetched:", response.data.data);

                if(!r.isEmpty(response.data.data) )

                this.books = response.data.data.reduce((acc: Record<string, Book>, item: any) => {
                    const { id, author, cover, isbn, pages, published, title } = item.book;
                    const status = item.status;
                    acc[id] = { id: String(id), author, cover, isbn, pages, published, title, status };
                    return acc;
                }, {});
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        registerUser = async (userDetails: { name: string; email: string; key: string; secret: string }) => {
            try {
                const headers = generateAuthHeaders("POST", "/signup", userDetails, userDetails.key, userDetails.secret);
                const response = await api.post("/signup", userDetails, { headers });
                const responseData = response.data.data;
                saveCredentials(responseData.key, responseData.secret);
                this.isAuthenticated = true;
                return {
                    isOk: true,
                    key: String(responseData.key),
                    secret: String(responseData.secret),
                };
            } catch (error: any) {
                console.error("Registration error:", error);
                return {
                    isOk: false,
                    message: error.response.data.message,
                };
            }
        };

        addBook = async (bookData: { isbn: string }) => {
            const headers = generateAuthHeaders("POST", "/books", bookData);
            try {
                await api.post("/books", bookData, { headers });
                await this.fetchBooks();
            } catch (error) {
                console.error("Error adding book:", error);
            }
        };

        editBook = async (id: string, { status, title }: { status: number; title: string }) => {
            const headers = generateAuthHeaders("PATCH", `/books/${id}`, { status });
            try {
                await api.patch(`/books/${id}`, { status }, { headers });
                await this.fetchBooks();
            } catch (error) {
                console.error("Error editing book:", error);
            }
        };

        deleteBook = async (id: string) => {
            const headers = generateAuthHeaders("DELETE", `/books/${id}`, null);
            try {
                await api.delete(`/books/${id}`, { headers });
                delete this.books[id];
            } catch (error) {
                console.error("Error deleting book:", error);
            }
        };

        checkUser = async () => {
            this.loading = true;
            try {
                const headers = generateAuthHeaders("GET", "/myself", null);
                const response = await api.get("/myself", { headers });
                this.isAuthenticated = response.data.isOk;
            } catch (error) {
                console.error("User check error:", error);
                this.isAuthenticated = false;
            } finally {
                this.loading = false;
            }
            return this.isAuthenticated;
        };
    }

    export const BookStoreContext = React.createContext<BookStore>(null!);

    export const useBookStore = () => {
        return React.useContext(BookStoreContext)!;
    };
