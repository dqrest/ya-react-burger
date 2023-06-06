import React, { ReactNode} from "react";

interface IErrorBoundaryProps {
    children?: ReactNode;
}

interface IErrorState {
    hasError: boolean;
}

export default class ErrorBoundary extends React.Component<IErrorBoundaryProps> {

    state: Readonly<IErrorState> = {
        hasError: false
    };

    constructor(props: IErrorBoundaryProps) {
        super(props);        
    }

    // с помощью этого метода меняем стейт компонента при возникновении ошибки:
    static getDerivedStateFromError() {
        return { hasError: true };
    }

    // с помощью этого метода логируем информацию об ошибке:
    componentDidCatch(error: any, info: any) {
        console.log("Возникла ошибка!", error, info);
    }

    render() {
        if (this.state.hasError) {
            // если возникла ошибка, сообщаем об этом пользователю в специальном компоненте:
            return (
                <section>
                    <h1>Что-то пошло не так :(</h1>
                    <p>
                        В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
                    </p>
                </section>
            );
        }        
        // если всё работает штатно, рендерим дочерние компоненты
        return this.props.children;
    }
}