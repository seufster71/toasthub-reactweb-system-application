import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from '../../coreView/common/table';
import Modal from '../../coreView/common/modal';
import Input from '../../coreView/common/text-input';
import Select from '../../coreView/common/select-input';

export default function ApplicationView({containerState, applications, appPrefs, onListLimitChange,
	onSearchChange, onSearchClick, onPaginationClick, onColumnSort, openDeleteModal, closeModal, onModify, onDelete, inputChange }) {

  let columns = [];
  
  if (applications.prefLabels != null && applications.prefLabels.ADMIN_APPLICATION_TABLE != null) {
	  columns = applications.prefLabels.ADMIN_APPLICATION_TABLE;
  }
  
  let header = "";
	if (applications.prefTexts.ADMIN_APPLICATION_PAGE != null && applications.prefTexts.ADMIN_APPLICATION_PAGE.ADMIN_APPLICATION_PAGE_HEADER != null) {
		header = applications.prefTexts.ADMIN_APPLICATION_PAGE.ADMIN_APPLICATION_PAGE_HEADER;
	}
  return (
	<div>
  		<Table
  			containerState={containerState}
  			header={header}
  			items={applications.items}
  			itemCount={applications.itemCount}
  			listStart={applications.listStart}
  			listLimit={applications.listLimit}
  			columns={columns}
  			appPrefs={appPrefs}
  			onListLimitChange={onListLimitChange}
  			onSearchChange={onSearchChange}
  			onSearchClick={onSearchClick}
  			onPaginationClick={onPaginationClick}
  			onColumnSort={onColumnSort}
  			onHeader={onModify}
  			onOption1={onModify}
  			onOption2={openDeleteModal}
  			openDeleteModal={openDeleteModal}
  		/>
  		<Modal isOpen={containerState.isDeleteModalOpen} onClose={closeModal()} >
  			<div className="modal-dialog">
  				<div className="modal-content">
  					<div className="modal-header">
  						<button type="button" className="close" data-dismiss="modal" aria-hidden="true"><i className="fa fa-close"/></button>
  						<h4 className="modal-title">Delete {containerState.selectedName}</h4>
  					</div>
  					<div className="modal-body">
  						<h3>Are you sure you want to delete?</h3>
  					</div>
  					<div className="modal-footer">
  						<button type="button" className="btn btn-primary" onClick={onDelete(containerState.selectedId)}>Delete</button>
  						<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal()}>Close</button>
  					</div>
  				</div>
  			</div>
  		</Modal>
  	</div>
  );
}


ApplicationView.propTypes = {
	containerState: PropTypes.object,
	applications: PropTypes.object,
	appPrefs: PropTypes.object,
	onListLimitChange: PropTypes.func,
	onSearchChange: PropTypes.func,
	onSearchClick: PropTypes.func,
	onPaginationClick: PropTypes.func,
	onColumnSort: PropTypes.func,
	openDeleteModal: PropTypes.func,
	closeModal: PropTypes.func,
	onModify: PropTypes.func,
	onDelete: PropTypes.func,
	inputChange: PropTypes.func
};
