import React, { ReactNode, useState } from "react";
import { useSpring, animated } from "react-spring";
import useMeasure from 'react-use-measure'
import { Pannel, Heading, ContentInner } from "./Collapse.style";
import { useTranslation } from 'react-i18next';
import useTheme from '../../hooks/useTheme';

interface Iprops {
  children: ReactNode,
  title: string,

}

const CollapsablePanel = (props:Iprops) => {
    const {t} = useTranslation()
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [ref, bounds] = useMeasure();
    const {theme} = useTheme()

    const togglePanel = () => {
        setIsCollapsed((prevState) => !prevState);
    };
    const panelContentAnimatedStyle = useSpring({
        height: isCollapsed ? 0 : bounds.height,
    });
    const toggleWrapperAnimatedStyle = useSpring({
        transform: isCollapsed ? "rotate(0deg)" : "rotate(45deg)",
        color: isCollapsed ? "#00E88A" : "#F6B91B",
        overflow: 'hidden',
    });
    const iconLeftStyle = useSpring({
        filter: 'drop-shadow(#F6B91B 100px 0)',
        transform: 'translateX(-100px)',
        width: theme.isH5 ? "16px" : '',
        height: theme.isH5 ? "16px" : '',
    })
    const icontStyle = useSpring({
        width: theme.isH5 ? "16px" : '',
        height: theme.isH5 ? "16px" : '',
    })
    return (
        // <Wrapper>
            <Pannel onClick={togglePanel}>
                <Heading>
                    <span>{t(`${props.title}`)}</span>
                    <animated.div style={toggleWrapperAnimatedStyle}>
                            <animated.img 
                              style={isCollapsed ? icontStyle :iconLeftStyle}
                              src={require('assets/svg/expand.svg').default} />
                    </animated.div>
                </Heading>
                <animated.div
                    style={panelContentAnimatedStyle}
                    
                    className="content"
                >
                    <ContentInner ref={ref}>
                      {props.children}
                    </ContentInner>
                </animated.div>
            </Pannel>
        // </Wrapper>
    );
};

export default CollapsablePanel;