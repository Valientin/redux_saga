import React from 'react';
import FormField from '../widgets/formFields';

import { addArticle } from '../../api';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import moment from 'moment-js';

class Add extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
            postError: '',
            loading: false,
            formData: {
                author: {
                    element: 'input',
                    value: '',
                    config: {
                        name: 'author_input',
                        className: 'add-page-input add-page-input__author',
                        type: 'text',
                        placeholder: 'Enter your name'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: ''
                },
                title: {
                    element: 'input',
                    value: '',
                    config: {
                        name: 'title_input',
                        className: 'add-page-input add-page-input__author',
                        type: 'text',
                        placeholder: 'Enter the title'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: ''
                },
                body:{
                    element:'texteditor',
                    value:'',
                    valid: true
                }
            }
        }
    }


    submitForm = (e) => {
        e.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formData){
            dataToSubmit[key] = this.state.formData[key].value;
            dataToSubmit.id = (Math.random()).toString(36).substr(2, 9);
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if(formIsValid){
            this.setState({
                loading: true,
                postError: ''
            })
            const now = moment().format('DD/MM/YYYY');
            dataToSubmit.date = now;

            addArticle(dataToSubmit);

            this.setState({
                loading: false
            })

            this.props.history.push('/articles');
        } else {
            this.setState({
                postError: 'Something went wrong'
            })
        }
    }

    updateForm = (elem, content = '') => {
        const newFormData = {...this.state.formData}
        const newElem = {...newFormData[elem.id]}

        if(content === ''){
            newElem.value = elem.e.target.value;
        } else {
            newElem.value = content;
        }

        if(elem.blur){
            let validData = this.validate(newElem);
            newElem.valid = validData[0];
            newElem.validationMessage = validData[1]
        }

        newElem.touched = elem.blur;
        newFormData[elem.id] = newElem;

        this.setState({
            formData: newFormData
        })
    }
    
    validate = (elem) => {
        let error = [true,''];

        if(elem.validation.required){
            const valid = elem.value.trim() !== '';
            const message = `${!valid ? 'This field is required': ''}`;
            error = !valid ? [valid, message] : error
        }

        return error;
   }

    submitButton = () => (
        this.state.loading ?
            'loading...'
        :
            <button className="button-submit green" type="submit">Add Article</button>
    )

    showError = () => (
        this.state.postError !== '' ?
            <div className="error">
                {this.state.postError}
            </div>
        : ''
    )

    onEditorStateChange = (editorState) => {
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const html = draftToHtml(rawContentState);

        this.updateForm({id:'body'},html)
        this.setState({
            editorState
        })
    }

    render(){
        return(
            <div className="add-page__container">
                <h2 className="add-page__title">Add article</h2>
                <form onSubmit={this.submitForm}>
                    <FormField
                        id={'author'}
                        formData={this.state.formData.author}
                        change={(elem) => this.updateForm(elem)}
                    />
                    <FormField
                        id={'title'}
                        formData={this.state.formData.title}
                        change={(elem) => this.updateForm(elem)}
                    />
                    <Editor
                        editorState={this.state.editorState}
                        wrapperClassName="myEditor-wrapper"
                        editorClassName="myEditor-editor"
                        onEditorStateChange={this.onEditorStateChange}
                    />
                    <div className="button-submit__wrapper">
                        {this.submitButton()}
                    </div>
                    {this.showError()}
            </form>
         </div>
      )
   }
}

export default Add;