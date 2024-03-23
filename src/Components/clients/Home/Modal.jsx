import React from 'react';

const Modal = () => {
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Select a source</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="folder-icon-div">
              <div className="my-computer">
                <i className="fas fa-folder"></i>
                My Computer
              </div>
            </div>
            <input type="file" id="fileInput" multiple style={{ display: 'none' }} />
            <label htmlFor="fileInput" id="uploadArea" className="drop-area">
              <i className="fas fa-cloud-upload-alt" style={{ fontSize: '30px' }}></i>
              Drag and drop anywhere on the page, or click to upload files.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
