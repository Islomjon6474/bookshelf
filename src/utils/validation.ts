export const isValidText = (text: string) => text && text.trim().length > 2;
export const isValidISBN = (isbn: string) => isbn && isbn.trim().length === 13;
