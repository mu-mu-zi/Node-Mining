import React, {ComponentType, ReactNode, useCallback, useEffect, useRef, useState} from 'react';

export const ModalContext = React.createContext({
    openModal<T>(ModalComponent: ComponentType<T & IOpenModal>, props?: T): symbol {
       return Symbol("modal");
    },
    destoryModal(modalId: symbol) {

    }
});

type IProps = {
    children: ReactNode
}
export interface IOpenModal {
    destoryComponent(): void
}
export default function ModalProvider(props: IProps) {
    const [ modalData, setModalData ] = useState<{[propName: symbol]: {component: ComponentType<any>, props: any}}>({});
    const modalDataRef = useRef<{[propName: symbol]: {component: ComponentType<any>, props: any}}>({});

    useEffect(() => {
        modalDataRef.current = modalData;
    }, [modalData]);

    return (
        <ModalContext.Provider value={{
            openModal<T>(ModalComponent: ComponentType<T & IOpenModal>, props?: T): symbol {
                let modalId = Symbol("modal");
                let data = Object.assign({}, modalDataRef.current);
                data[modalId] = {
                    component: ModalComponent,
                    props: props
                };
                setModalData(data);
                return modalId;
            },
            destoryModal(modalId: symbol) {
                setTimeout(() => {
                  let data = Object.assign({}, modalDataRef.current);
                  delete data[modalId];
                  setModalData(data);
                }, 50);
            }
        }}>
            <>
                { props.children }
                {
                    Object.getOwnPropertySymbols(modalData).map((item, index) => {
                        let Component = modalData[item].component;
                        let props = modalData[item].props || {};
                        return <Component key={index} {...props} destoryComponent={() => {
                          setTimeout(() => {
                            let data = Object.assign({}, modalDataRef.current);
                            delete data[item];
                            setModalData(data);
                          }, 70);
                        }} />
                    })
                }
            </>
        </ModalContext.Provider>
    )
}
