import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* artSaga() {
  yield takeLatest("FETCH_ART", fetchArtSaga);
  yield takeLatest("FETCH_FRIEND_ART", fetchFriendArtSaga);
  yield takeLatest("LIKE", like);
  yield takeLatest("ADD_ART", addArtSaga);
  yield takeLatest("UPDATE_ART", updateArtSaga);
  yield takeLatest("DELETE_ART", deleteArtSaga);
}
function* like(action) {
  const id = action.payload;
  console.log("In like*()...");
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.put(`api/art/like/${action.payload}`, config);
    console.log("response from put like:", response);
  } catch (error) {
    console.log("Art get request failed", error);
  }
}
function* fetchArtSaga() {
  yield put({ type: "UNSET_FRIENDLY" });
  console.log("In fetchArtSaga...");
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get("api/art", config);
    yield put({ type: "SET_ART", payload: response.data });
  } catch (error) {
    console.log("Art get request failed", error);
  }
}
function* fetchFriendArtSaga(action) {
  console.log("(1)In fetchFriendArtSaga...");
  const id = action.payload;
  console.log("(2)artist:", id);
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get(`api/art/${id}`, config);
    yield put({ type: "SET_FRIEND_ART", payload: response.data });
  } catch (error) {
    console.log("Art get request failed", error);
  }
  yield put({ type: "SET_FRIENDLY" });
}
function* addArtSaga(action) {
  console.log("In addArtSaga...");
  console.log("payload:", action.payload);
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.post("api/art", action.payload, config);
  } catch (error) {
    console.log("Art get request failed", error);
  }
}
function* updateArtSaga(action) {
  console.log("In updateArtSaga...");
  console.log("payload:", action.payload);
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.put("api/art", action.payload, config);
    yield put({ type: "FETCH_ART" });
  } catch (error) {
    console.log("Art get request failed", error);
  }
}
function* deleteArtSaga(action) {
  console.log("In deleteArtSaga...");
  console.log("payload:", action.payload);
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.delete(`api/art/${action.payload}`, config);
  } catch (error) {
    console.log("Art get request failed", error);
  }
}

// function* fetchDetailsSaga(action) {
//   console.log("In fetchDetailsSaga...");
//   console.log("payload:", action.payload);

//   try {
//     const config = {
//       headers: { "Content-Type": "application/json" },
//       withCredentials: true,
//     };

//     const response = yield axios.get(`api/art/${action.payload}`, config);

//     yield put({ type: "SET_ART", payload: response.data });
//   } catch (error) {
//     console.log("Art get request failed", error);
//   }
// }
export default artSaga;
