import React from 'react';
import FormField from '../../components/widgets/formFields';
import { connect } from 'react-redux';
import { getArticle } from '../../actions';
import { putArticle } from '../../api';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
// import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import moment from 'moment-js';

class Edit extends React.Component {
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
                        className: 'edit-page-input edit-page-input__author',
                        type: 'text',
                        placeholder: 'Enter author'
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
                        className: 'edit-page-input edit-page-input__title',
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


    componentDidMount(){
        this.props.getArticle(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps){
        let newFormData = {};
        for(let key in this.state.formData){
            newFormData[key] = this.state.formData[key];
            newFormData[key].value = nextProps.article[key];
            newFormData[key].valid = true;
        }
        
        this.setState({
            editorState: EditorState.push(this.state.editorState, ContentState.createFromText(nextProps.article.body), 'remove-range'),
            formData: newFormData
        })
    }


    submitForm = (e) => {
        e.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formData){
            dataToSubmit[key] = this.state.formData[key].value;
            dataToSubmit.id = this.props.match.params.id;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if(formIsValid){
            this.setState({
                loading: true,
                postError: ''
            })
            const now = moment().format('DD/MM/YYYY');
            dataToSubmit.date = now;
            putArticle(dataToSubmit);
            this.props.history.push('/admin');
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
            <button className="button-submit" type="submit">Edit Article</button>
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
            <div className="edit-page__container">
                <h2 className="edit-page__title">Edit Article</h2>
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

function mapDispatchToProps(dispatch){
    return {
        getArticle: (id) => dispatch(getArticle(id))
    }
}


function mapStateToProps(state){
	return {
        article: state.articles.article
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);