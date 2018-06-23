import React from 'react';

const FormFields = ({formData, change, id}) => {

    const showError = () => {
        let errorMessage = null;
        if(formData.validation && !formData.valid){
            errorMessage = (
                <div className="label-error">
                    {formData.validationMessage}
                </div>
            )
        }
        return errorMessage;
    }

    const renderTemplate = () => {
        let formTemplate = null;

        switch(formData.element) {
            case 'input':
                formTemplate = (
                    <input
                        {...formData.config}
                        value={formData.value}
                        onBlur={(e) => change({e, id, blur:true})}
                        onChange={(e) => change({e, id, blur:false})}
                    />
                )
                break;
            default:
                formTemplate = null;
        }
            return formTemplate;
    }

    return(
        <div className="input-wrapper">
            {renderTemplate()}
            {showError()}
        </div>
   )
}

export default FormFields;
