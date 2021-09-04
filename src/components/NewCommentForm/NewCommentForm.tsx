import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './NewCommentForm.scss';
import { NewComment } from '../../types';

import {
  addPostComment,
  setCommentsUpdated
} from '../../store/commentsReducer';


interface NewCommentFormProps {
  postId: number;
}

export const NewCommentForm: React.FC<NewCommentFormProps> = React.memo(({
  postId,
}) => {
  const initialValues: NewComment = {
    name: '',
    email: '',
    body: '',
    postId: postId,
  };

  const [newComment, setNewComment] = useState(initialValues);
  const dispatch = useDispatch();

  useEffect(() => {
    setNewComment(initialValues);
  }, [postId]);

  const resetForm = () => {
    setNewComment({
      name: '',
      email: '',
      body: '',
      postId: postId,
    });
  };

  const validateForm = (newComment: NewComment) => {
    let isFormValid = true;
    if (!newComment.name.length) {
      isFormValid = false;
    }

    return isFormValid;
  };

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;

    setNewComment(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = () => {
    if (validateForm(newComment) === true) {
      addCommentHandler(newComment);
      setNewComment(initialValues);
      resetForm();
    } else {
      console.log('Write message');
    }
  };

  const addCommentHandler = async (comment: NewComment) => {
    const date = Date.now().toString();
    const newComment = {
      ...comment,
      id: Number(date.substr(date.length - 6)),
    };

    console.log('new comment is ', newComment);

    await addPostComment(newComment);
    dispatch(setCommentsUpdated(true));
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(e) => {
        e.preventDefault();
        submitForm();
      }}
      method="POST"
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={newComment.name}
          onChange={handleChangeInput}
        />
        {/* {errors.name
          && <p className="NewCommentForm__error">{errors.name.message}</p>
        } */}
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={newComment.email}
          onChange={handleChangeInput}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comments here"
          className="NewCommentForm__input"
          value={newComment.body}
          // {...register('body', {
          //   required: 'Message text is required.',
          //   minLength: {
          //     value: 5,
          //     message: 'Minimal length of message text is 5.',
          //   },
          //   pattern: {
          //     value: /^$|.*\S+.*/,
          //     message: 'Message should\'t be made up of whitespaces.',
          //   },
          // })}
          onChange={handleChangeInput}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
});
