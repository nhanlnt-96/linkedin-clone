import { call, put } from 'redux-saga/effects';
import { createPost, deletePost, getAllPosts, getPostById, getPostByUser } from '../../network/services/post';
import {
  loadPostByIdSuccess,
  loadPostByUserFail,
  loadPostByUserSuccess,
  loadPostFail,
  loadPostSuccess
} from '../redux/posts/actions';
import { createComment, getCommentById, deleteCommentRequest } from '../../network/services/comment';
import { loadCommentFail, loadCommentSuccess } from '../redux/comments/actions';
import { likePostFail, likePostSuccess } from '../redux/likes/actions';
import { likesPost } from '../../network/services/likesPost';

//post
export function* onCreatePostRequest(action) {
  try {
    yield call(createPost, action.payload)
    const response = yield call(getAllPosts);
    yield put(loadPostSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}

export function* onLoadPostStartAsync() {
  try {
    const response = yield call(getAllPosts);
    yield put(loadPostSuccess(response.data));
  } catch (error) {
    yield put(loadPostFail(error));
  }
}

export function* onLoadPostByIdStartAsync(action) {
  try {
    const response = yield call(getPostById, action.payload);
    yield put(loadPostByIdSuccess(response.data));
  } catch (error) {
    yield put(loadPostFail(error));
  }
}

export function* onLoadPostByUserStartAsync(action) {
  try {
    const response = yield call(getPostByUser, action.payload);
    yield put(loadPostByUserSuccess(response.data));
  } catch (error) {
    yield put(loadPostByUserFail(error));
  }
}

export function* onDeletePostStart(action) {
  try {
    yield call(deletePost, action.payload);

    const response = yield call(getAllPosts);
    yield put(loadPostSuccess(response.data));

    const postById = yield call(getPostById, action.payload);
    yield put(loadPostByIdSuccess(postById.data));
  } catch (error) {
    yield put(loadPostFail(error));
  }
}


//comment
export function* onCreateCommentRequest(action) {
  try {
    yield call(createComment, action.payload.id, action.payload.commentBody)
    const response = yield call(getCommentById, action.payload.id);
    yield put(loadCommentSuccess(response.data));
  } catch (error) {
    yield put(loadCommentFail(error))
  }
}

export function* onLoadCommentStartAsync(action) {
  try {
    const response = yield call(getCommentById, action.payload);
    yield put(loadCommentSuccess(response.data));
  } catch (error) {
    yield put(loadCommentFail(error));
  }
}

export function* onDeleteComment(action) {
  try {
    yield call(deleteCommentRequest, action.payload.commentId);
    const response = yield call(getCommentById, action.payload.id);
    yield put(loadCommentSuccess(response.data));
  } catch (error) {
    yield put(loadCommentFail(error));
  }
}

//like system
export function* onLikePost(action) {
  try {
    const response = yield call(likesPost, action.payload.PostId);
    yield put(likePostSuccess(response.data));

    const allPostResponse = yield call(getAllPosts);
    yield put(loadPostSuccess(allPostResponse.data));

    const postById = yield call(getPostById, action.payload.PostId);
    yield put(loadPostByIdSuccess(postById.data));

    const postByUser = yield call(getPostByUser, action.payload.UserId);
    yield put(loadPostByUserSuccess(postByUser.data));
  } catch (error) {
    yield put(likePostFail(error));
  }
}

