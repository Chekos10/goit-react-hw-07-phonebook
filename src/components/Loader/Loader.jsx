import css from '../Loader/Loader.module.css'
import {BallTriangle} from 'react-loader-spinner'
export const Loader = () =>{
    return (
        <div className={css.loader}>
        <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
        /> 
        </div>
    )
}