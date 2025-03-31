import { Card } from "./card";

export type Column = {
    title: string;
    column: string;
    headingColor: string;
    cards: Card[];
    setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}