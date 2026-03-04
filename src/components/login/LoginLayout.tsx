import React, {useEffect} from "react";
import {ensureLoginKeyframes, loginStyles as styles} from "./LoginStyles";

type Props = { children: React.ReactNode };

const LoginLayout: React.FC<Props> = ({children}) => {
    useEffect(() => {
        ensureLoginKeyframes();
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.bgGrid}/>
            <div style={styles.glowTopLeft}/>
            <div style={styles.glowBottomRight}/>
            <div style={styles.orb1}/>
            <div style={styles.orb2}/>
            <div style={styles.orb3}/>
            {children}
        </div>
    );
};

export default LoginLayout;
