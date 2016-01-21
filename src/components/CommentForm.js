import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
export const fields = ['author_name', 'author_email', 'content'];


const validate = values => {
    const errors = {};
    if (!values.author_name) {
        errors.author_name = 'Required';
    }
    if (!values.author_email) {
        errors.author_email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.author_email)) {
        errors.author_email = 'Invalid email address';
    }
    if (!values.content) {
        errors.content = 'Required';
    } else if (values.content.length < 5) {
        errors.content = 'Comment too short';
    }
    return errors;
};

@reduxForm({
    form: 'comment',
    fields,
    validate
})

export default class CommentForm extends Component {
    static propTypes = {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        resetForm: PropTypes.func.isRequired,
        submitting: PropTypes.bool.isRequired
    };

    render() {
        const {
            fields: {author_name, author_email, content},
            handleSubmit,
            resetForm,
            submitting
            } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <fieldset className={'form-group' + (author_name.touched && author_name.error ? ' has-error' : '')}>
                    <input required className="form-control" type="text" placeholder="First Name" {...author_name}/>
                    {author_name.touched && author_name.error && <small className="text-danger">{author_name.error}</small>}
                </fieldset>
                <fieldset className={'form-group' + (author_email.touched && author_email.error ? ' has-error' : '')}>
                    <input required className="form-control" type="email"
                           placeholder="Email" {...author_email}/>
                    {author_email.touched && author_email.error && <small className="text-danger">{author_email.error}</small>}
                </fieldset>
                <fieldset className={'form-group' + (content.touched && content.error ? ' has-error' : '')}>
                    <textarea placeholder="Your comment" className="form-control" {...content}
                              value={content.value || ''}/>
                    {content.touched && content.error && <small className="text-danger">{content.error}</small>}
                </fieldset>
                <div>
                    <button className="btn btn-primary" disabled={submitting} onClick={handleSubmit}>
                        {submitting ? <i/> : <i className="fa fa-paper-plane" />} Submit
                    </button>
                    {" "}
                    <button className="btn btn-default" disabled={submitting} onClick={resetForm}>
                        Clear Values
                    </button>
                </div>
            </form>
        );
    }
}