import React from 'react'
import './Modal.css'
import CloseIcon from '@mui/icons-material/Close';

const ModalEditar = ({isOpen , setModalEditarOpen,children}) => {
    if(isOpen){
        return( 
        <div className='background'>
            <div className='modal-style'>
               {children}
            </div>
            <button  className='btnmodal' onClick={setModalEditarOpen}><CloseIcon/></button>
        </div>
        )

    }
    return null
}
export default ModalEditar