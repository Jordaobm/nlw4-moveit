import Head from 'next/head';
import { useState } from 'react';
import { useContextLogged } from '../context/Logged';
import { useUser } from '../context/user';
import { ResponseAPIGitHub } from '../dtos/types';
import { apiGitHub } from '../services/apiGitHub';
import styles from '../styles/components/Login.module.css';


export default function Login() {

    const [inputValueUserName, setInputValueUserName] = useState('');
    const [inputErr, setInputErr] = useState(false);
    const [userNotFound, setUserNotFound] = useState(false);
    const { setUser } = useUser();
    const { setIsLogged } = useContextLogged();


    async function searchUserNameGitHub() {

        if (inputValueUserName !== '') {
            await apiGitHub.get<ResponseAPIGitHub>(`/users/${inputValueUserName}`).then(
                response => {
                    setUser({
                        name: response.data.name,
                        avatar_url: response.data.avatar_url
                    })
                    setIsLogged(true);
                }
            ).catch(
                response => {
                    setInputErr(true);
                    setUserNotFound(true);
                }
            )
            return;
        }
        setInputErr(true);

        return;
    }

    console.log(inputErr)
    return (
        <>
            <Head>
                <title>Login | Moveit</title>
            </Head>
            <div className={styles.background}>
                <div className={styles.Content}>
                    <div className={styles.ContentImage}>
                        <img src="icons/background.svg" alt="Background" />
                    </div>
                    <div className={styles.contentLogin}>
                        <img src="icons/logo.svg" alt="Logo" />
                        <h1>Bem vindo</h1>

                        <div className={styles.git}>
                            <img src="icons/git.svg" alt="GitHub Logo" />
                            <p>Faça login com seu Github para começar</p>
                        </div>


                        {!inputErr ?
                            <div className={styles.contentInputAndButton}>
                                <input type="text" placeholder="Digite seu username" onChange={text => setInputValueUserName(text.target.value)} />
                                <button onClick={searchUserNameGitHub}>
                                    <img src="icons/arrow.svg" alt="Entrar" />
                                </button>
                            </div>
                            :

                            <div className={`${styles.contentInputAndButton} ${styles.inputErr}`}>

                                <input onFocus={() => {setInputErr(false); setUserNotFound(false)}} type="text" placeholder="Digite seu username" onChange={text => setInputValueUserName(text.target.value)} />
                                <button onClick={searchUserNameGitHub}>
                                    <img src="icons/arrow.svg" alt="Entrar" />
                                </button>
                            </div>

                        }
                        {userNotFound && <span className={styles.userNotFound}>Usuário não encontrado</span>}

                    </div>
                </div>
            </div>
        </>
    )
}