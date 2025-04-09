import Navbar from "../components/Navbar";
import {loginDiv, loginBox, loginInput, loginButton} from './login.module.css'

export default function Login(){
    return<>
    <Navbar tittle='Login'/>
    <div className={loginDiv}>
        <form className={loginBox}>
            <p>فرم ورود</p>
            <div className={loginInput}>
            <input dir="rtl" placeholder="نام کاربری" type="text" />
            </div>
            <div className={loginInput}>
            <input dir="rtl" placeholder="رمز ورود" type="password" />
            </div>
            
        </form>
        <button onClick={()=>alert('لاگین نمایشیست')} className={loginButton}>ورود</button>
    </div>
    </>
}