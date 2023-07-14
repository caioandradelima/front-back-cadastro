import React from 'react'
import './Modal.css'
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({isOpen , setModalOpen,children}) => {
    if(isOpen){
        return( 
        <div className='background'>
            <div className='modal-style'>
               {children}
            </div>
            <button  className='btnmodal' onClick={setModalOpen}><CloseIcon/></button>
        </div>
        )

    }
    return null
}
export default Modal