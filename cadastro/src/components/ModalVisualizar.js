import React from 'react'
import './Modal.css'
import CloseIcon from '@mui/icons-material/Close';

const ModalVisualizar = ({isOpen , setModalVisualizarOpen,children }) => {
    if(isOpen){
        return( 
        <div className='background'>
            <div className='modal-style'>
               {children}
            </div>
            <button  className='btnmodal' onClick={setModalVisualizarOpen}><CloseIcon/></button>
        </div>
        )

    }
    return null
}
export default ModalVisualizar
