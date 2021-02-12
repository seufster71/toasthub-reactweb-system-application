import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from '../../coreView/common/modal';
import Input from '../../coreView/common/text-input';
import MultiLangTextInput from '../../coreView/common/multi-lang-text-input';
import Select from '../../coreView/common/select-input';
import CheckBox from '../../coreView/common/checkBox';
import Switch from '../../coreView/common/switch';

export default function ApplicationModifyView({containerState, item, inputFields, appPrefs, itemPrefForms, onSave, onCancel, inputChange}) {
    
	let adminApplicationFormTitle = {};

    let adminApplicationFormCode = {};
    let codeDefault = "";
    
    let adminApplicationFormActive = {};
    let activeDefault = true;
    let activeOptions = [];
    
    let adminApplicationFormDefault = {};
    let defaultDefault = true;
    let defaultOptions = [];
    
    let adminApplicationFormDirection = {};
    let directionDefault = "ltr";
    let directionOptions = [];
    
    
    if (itemPrefForms != null && itemPrefForms.ADMIN_APPLICATION_FORM != null) {
    	for (let i = 0; i < itemPrefForms.ADMIN_APPLICATION_FORM.length; i++) {
    		switch (itemPrefForms.ADMIN_APPLICATION_FORM[i].name) {
    		case "ADMIN_APPLICATION_FORM_TITLE":
    			adminApplicationFormTitle = itemPrefForms.ADMIN_APPLICATION_FORM[i];
    			break;
    		case "ADMIN_APPLICATION_FORM_CODE":
    			adminApplicationFormCode = itemPrefForms.ADMIN_APPLICATION_FORM[i];
    			if (adminApplicationFormCode.classModel != "") {
    				let codeModel = JSON.parse(adminApplicationFormCode.classModel);
    				if (item != null && item[codeModel.field] != null) {
    					codeDefault = item[codeModel.field];
    				}
    			}
    			break;
    		case "ADMIN_APPLICATION_FORM_ACTIVE":
    			adminApplicationFormActive = itemPrefForms.ADMIN_APPLICATION_FORM[i];
    			if (adminApplicationFormActive.classModel != "") {
    				let activeModel = JSON.parse(adminApplicationFormActive.classModel);
    				if (item != null && item[activeModel.field] != null) {
    					activeDefault = item[activeModel.field];
    				}
    				activeOptions = JSON.parse(adminApplicationFormActive.value);
    			}
    			break;
    		case "ADMIN_APPLICATION_FORM_DEFAULT":
    			adminApplicationFormDefault = itemPrefForms.ADMIN_APPLICATION_FORM[i];
    			if (adminApplicationFormDefault.classModel != "") {
    				let defaultModel = JSON.parse(adminApplicationFormDefault.classModel);
    				if (item != null && item[defaultModel.field] != null) {
    					defaultDefault = item[defaultModel.field];
    				}
    				defaultOptions = JSON.parse(adminApplicationFormDefault.value);
    			}
    			break;
    		case "ADMIN_APPLICATION_FORM_DIRECTION":
    			adminApplicationFormDirection = itemPrefForms.ADMIN_APPLICATION_FORM[i];
    			if (adminApplicationFormDirection.classModel != "") {
    				let directionModel = JSON.parse(adminApplicationFormDirection.classModel);
    				if (item != null && item[directionModel.field] != null) {
    					directionDefault = item[directionModel.field];
    				}
    				directionOptions = JSON.parse(adminApplicationFormDirection.value);
    			}
    			break;
    		}
    	}
    }
    return (
    	<div className="col-lg-12">
    		
			<h4 className="modal-title">Application</h4>

			<div className="row">
				<div className="col-sm-4">
					<MultiLangTextInput formField={adminApplicationFormTitle} item={item} inputFields={inputFields} errors={containerState.errors} onChange={inputChange} appPrefs={appPrefs}/>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-4">
					<Input name={adminApplicationFormCode.name} inputType={adminApplicationFormCode.htmlType} label={adminApplicationFormCode.label} rendered={adminApplicationFormCode.rendered} required={adminApplicationFormCode.required} errors={containerState.errors} onChange={inputChange(adminApplicationFormCode.name)} value={(inputFields != null && inputFields[adminApplicationFormCode.name] != null)?inputFields[adminApplicationFormCode.name]:codeDefault}/>
				</div>
			</div>
			<div className="row">
				{adminApplicationFormDirection.rendered && 
					<div className="col-md-4">
						<Select name={adminApplicationFormDirection.name} label={adminApplicationFormDirection.label} required={adminApplicationFormDirection.required} errors={containerState.errors} options={directionOptions.options} onChange={inputChange(adminApplicationFormDirection.name)} value={(inputFields != null && inputFields[adminApplicationFormDirection.name] != null)?inputFields[adminApplicationFormDirection.name]:directionDefault}/>
					</div>
				}
				{adminApplicationFormActive.rendered && 
					<div className="col-md-4">
						<Switch name={adminApplicationFormActive.name} label={adminApplicationFormActive.label} rendered={adminApplicationFormActive.rendered} required={adminApplicationFormActive.required} fieldName={adminApplicationFormActive.name} options={activeOptions.options} value={(inputFields != null && inputFields[adminApplicationFormActive.name] != null)?inputFields[adminApplicationFormActive.name]:activeDefault}  onClick={inputChange} />
					</div>
				}
				{adminApplicationFormDefault.rendered && 
					<div className="col-md-4">
						<Switch name={adminApplicationFormDefault.name} label={adminApplicationFormDefault.label} rendered={adminApplicationFormDefault.rendered} required={adminApplicationFormDefault.required} fieldName={adminApplicationFormDefault.name} options={defaultOptions.options} value={(inputFields != null && inputFields[adminApplicationFormDefault.name] != null)?inputFields[adminApplicationFormDefault.name]:defaultDefault}  onClick={inputChange} />
					</div>
				}
			</div>
			
			<button type="button" className="btn btn-primary" onClick={onSave()}>Save</button>
			<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onCancel()}>Cancel</button>
    	</div>
    );
}


ApplicationModifyView.propTypes = {
  containerState: PropTypes.object,
  item: PropTypes.object,
  appPrefs: PropTypes.object,
  itemPrefForms: PropTypes.object,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  inputChange: PropTypes.func
};
