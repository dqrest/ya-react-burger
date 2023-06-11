export enum TOrderState {
    Done = "done",
    Created = "created",
    Canceled = "canceled"
};

export const translateOrderState = (state: string) =>
{
    switch (state) {
        case TOrderState.Done:
            return "Выполнен";
        case TOrderState.Created:
            return "Готовится";
        case TOrderState.Canceled:
            return "Отменен";
        default:
            return 'Неизвестный';
    }
}