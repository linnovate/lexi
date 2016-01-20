import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
export const fields = ['comment_author', 'comment_author_email', 'comment_content', 'comment_post_ID'];


const validate = values => {
    const errors = {};
    if (!values.comment_author) {
        errors.comment_author = 'Required';
    }
    if (!values.comment_author_email) {
        errors.comment_author_email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.comment_author_email)) {
        errors.comment_author_email = 'Invalid email address';
    }
    if (!values.comment_content) {
        errors.comment_content = 'Required';
    } else if (values.comment_content.length < 5) {
        errors.comment_content = 'Comment too short';
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
            fields: {comment_post_ID, comment_author, comment_author_email, comment_content},
            handleSubmit,
            resetForm,
            submitting,
            } = this.props;
        fields.comment_post_ID = this.props.comment_post_ID;
        return (
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="comment_post_ID" value="123" {...comment_post_ID}/>
                <fieldset className="form-group">
                    <input required className="form-control" type="text" placeholder="First Name" {...comment_author}/>
                    {comment_author.touched && comment_author.error && <div className="">{comment_author.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <input required className="form-control" type="email"
                           placeholder="Email" {...comment_author_email}/>
                    {comment_author_email.touched && comment_author_email.error && <div className="">{comment_author_email.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <textarea placeholder="Your comment" className="form-control" {...comment_content}
                              value={comment_content.value || ''}/>
                    {comment_content.touched && comment_content.error && <div className="">{comment_content.error}</div>}
                </fieldset>
                <div>
                    <button className="btn btn-primary" disabled={submitting} onClick={handleSubmit}>
                        {submitting ? <i/> : <i className="fa fa-paper-plane" />} Submit
                    </button>
                    &nbsp;
                    <button className="btn btn-default" disabled={submitting} onClick={resetForm}>
                        Clear Values
                    </button>
                </div>
            </form>
        );
    }
}