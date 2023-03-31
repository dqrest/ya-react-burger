import React from 'react';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

export default class BurgerConstructor extends React.Component {

    constructor(props) {
        super(props);        
    }

    render() {
        return (
            <>
                {this.props.burgers.map((b) =>
                    <ConstructorElement
                        key={b._id}
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={b.image_mobile}
                    />)}
            </>
        );
    };
}